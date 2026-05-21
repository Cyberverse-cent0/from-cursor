#!/usr/bin/env python3
"""
Production-Ready Flask Session Manager for Admin Panel
Enhanced version with comprehensive error handling, monitoring, and database management
"""

import os
import json
import time
import threading
import sqlite3
import secrets
import hashlib
import functools
from datetime import datetime, timezone, timedelta
from typing import Dict, Optional, Any
from flask import Flask, request, jsonify, Response, send_file
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import uuid
from PIL import Image
import io

# ============================================================================
# CONFIGURATION
# ============================================================================

# Server Configuration
FLASK_PORT = int(os.getenv('FLASK_PORT', 5001))
ALLOWED_ORIGIN = os.getenv('ALLOWED_ORIGIN', 'http://localhost:3000')
SESSION_TIMEOUT = int(os.getenv('SESSION_TIMEOUT', 300))

# Rate Limiting Configuration
RATE_LIMIT_ATTEMPTS = int(os.getenv('RATE_LIMIT_ATTEMPTS', 5))
RATE_LIMIT_WINDOW = int(os.getenv('RATE_LIMIT_WINDOW', 60))

# Database Configuration
SQLITE_PATH = os.getenv('SQLITE_PATH', 'data/users.db')

# Passport Photo Configuration
PASSPORT_PHOTO_DIR = os.getenv('PASSPORT_PHOTO_DIR', 'data/passport_photos')
PASSPORT_PHOTO_MAX_SIZE = int(os.getenv('PASSPORT_PHOTO_MAX_SIZE', 5 * 1024 * 1024))  # 5MB
PASSPORT_PHOTO_ALLOWED_TYPES = {'image/jpeg', 'image/jpg', 'image/png'}
PASSPORT_PHOTO_MAX_DIMENSION = 800
PASSPORT_PHOTO_MIN_DIMENSION = 200

# ============================================================================
# IN-MEMORY STORES
# ============================================================================

# Active sessions: session_id -> session_data
# Each session contains: user_id, username, display_name, role, ip_address, 
# created_at, last_activity
active_sessions: Dict[str, Dict] = {}

# Rate limiting: ip_address -> {count, last_attempt}
login_attempts: Dict[str, Dict] = {}

# ============================================================================
# THREAD SAFETY
# ============================================================================

# Prevents race conditions when accessing shared memory stores
session_lock = threading.Lock()
rate_limit_lock = threading.Lock()

app = Flask(__name__)
# Allow all localhost origins for development, single domain for production
if os.getenv('FLASK_ENV') == 'production':
    # Production: Use single domain with path-specific CORS
    CORS(app, 
         origins=['https://stephenasatsa.com'], 
         supports_credentials=True,
         resources={
             r"/api/*": {
                 "origins": ["https://stephenasatsa.com"],
                 "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                 "allow_headers": ["Content-Type", "Authorization"],
                 "supports_credentials": True
             }
         })
else:
    # Development: Allow all origins for network access
    CORS(app, 
         origins='*',
         supports_credentials=True)

# ============================================================================
# DATABASE INTERFACE
# ============================================================================

class UserDatabase:
    """
    Production-ready database interface with comprehensive error handling
    """
    
    def __init__(self, db_path: str):
        self.db_path = db_path
        self._connection_pool = []
        self._max_pool_size = 5
    
    def _get_connection(self):
        """Get database connection from pool or create new one"""
        try:
            if self._connection_pool:
                conn = self._connection_pool.pop()
                if conn and not conn.closed:
                    return conn
        except (IndexError, AttributeError):
            pass
        
        # Create new connection if pool is empty
        try:
            conn = sqlite3.connect(
                self.db_path,
                timeout=10.0,
                check_same_thread=False,
                isolation_level='IMMEDIATE'
            )
            
            # Optimize for production
            conn.execute("PRAGMA journal_mode=WAL")
            conn.execute("PRAGMA synchronous=NORMAL")
            conn.execute("PRAGMA cache_size=2000")
            conn.execute("PRAGMA temp_store=MEMORY")
            
            return conn
        except sqlite3.Error as e:
            print(f"Database connection error: {e}")
            raise
    
    def _return_connection(self, conn):
        """Return connection to pool if still valid"""
        try:
            if conn and not conn.closed and len(self._connection_pool) < self._max_pool_size:
                self._connection_pool.append(conn)
                return
            conn.close()
        except:
            pass
    
    def verify_user(self, username: str, password: str) -> Optional[Dict]:
        """Verify user credentials with robust error handling"""
        conn = None
        try:
            conn = self._get_connection()
            conn.row_factory = sqlite3.Row
            
            cursor = conn.cursor()
            user = cursor.execute(
                "SELECT * FROM users WHERE username = ? AND is_active = 1",
                (username,)
            ).fetchone()
            
            if not user:
                self._return_connection(conn)
                return None
            
            # Use existing password verification
            if not self._verify_password(password, user['password_hash']):
                self._return_connection(conn)
                return None
            
            # Update last login
            cursor.execute(
                "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?",
                (user['id'],)
            )
            conn.commit()
            
            user_dict = dict(user)
            self._return_connection(conn)
            return user_dict
            
        except sqlite3.Error as e:
            print(f"Database verification error: {e}")
            if conn:
                self._return_connection(conn)
            return None
        except Exception as e:
            print(f"Unexpected database error: {e}")
            return None
    
    def _verify_password(self, password: str, stored_hash: str) -> bool:
        """Verify password using existing method"""
        try:
            import base64
            import hmac
            
            if stored_hash.startswith('pbkdf2_sha256$'):
                parts = stored_hash.split('$')
                if len(parts) != 4:
                    return False
                
                algorithm, iterations, salt, encoded = parts
                if algorithm != 'pbkdf2_sha256':
                    return False
                
                digest = hashlib.pbkdf2_hmac(
                    'sha256',
                    password.encode('utf-8'),
                    salt.encode('utf-8'),
                    int(iterations),
                    dklen=32
                )
                candidate = base64.urlsafe_b64encode(digest).decode('ascii')
                return hmac.compare_digest(candidate, encoded)
            
            return check_password_hash(stored_hash, password)
        except Exception as e:
            print(f"Password verification error: {e}")
            return False
    
    def log_audit_event(self, user_id: Optional[int], action: str, actor: str, 
                      summary: str, ip_address: Optional[str] = None):
        """Log audit event with error handling"""
        try:
            conn = self._get_connection()
            conn.execute("""
                INSERT INTO audit_log (user_id, action, actor, summary, ip_address)
                VALUES (?, ?, ?, ?, ?)
            """, (user_id, action, actor, summary, ip_address))
            conn.commit()
            self._return_connection(conn)
        except Exception as e:
            print(f"Audit log error: {e}")
            if conn:
                self._return_connection(conn)

# ============================================================================
# SESSION MANAGEMENT
# ============================================================================

def generate_session_id() -> str:
    """Generate cryptographically secure session ID"""
    return secrets.token_hex(32)

def is_rate_limited(ip_address: str) -> bool:
    """Check if IP is rate limited"""
    with rate_limit_lock:
        now = time.time()
        
        # Initialize IP tracking if not exists
        if ip_address not in login_attempts:
            login_attempts[ip_address] = {'count': 0, 'last_attempt': 0}
        
        # Reset counter if time window has passed
        if now - login_attempts[ip_address]['last_attempt'] > RATE_LIMIT_WINDOW:
            login_attempts[ip_address] = {'count': 0, 'last_attempt': now}
        
        # Check if rate limit exceeded
        if login_attempts[ip_address]['count'] >= RATE_LIMIT_ATTEMPTS:
            return True
        
        return False

def cleanup_expired_sessions():
    """Background thread to clean up expired sessions"""
    while True:
        try:
            current_time = datetime.now(timezone.utc)
            expired_sessions = []
            
            with session_lock:
                for session_id, session_data in list(active_sessions.items()):
                    last_activity = session_data['last_activity']
                    
                    # Handle string datetime conversion
                    if isinstance(last_activity, str):
                        last_activity = datetime.fromisoformat(last_activity.replace('Z', '+00:00'))
                    
                    # Check if session has expired
                    if current_time - last_activity > timedelta(seconds=SESSION_TIMEOUT):
                        expired_sessions.append(session_id)
                
                # Remove expired sessions
                for session_id in expired_sessions:
                    del active_sessions[session_id]
                    print(f"Cleaned up expired session: {session_id}")
            
            time.sleep(60)  # Run every minute
        except Exception as e:
            print(f"Session cleanup error: {e}")

# ============================================================================
# FLASK APPLICATION
# ============================================================================

def require_session(f):
    """Decorator to require valid session for protected endpoints"""
    @functools.wraps(f)
    def decorated_function(*args, **kwargs):
        session_id = request.headers.get('X-Session-ID')
        if not session_id:
            return jsonify({'error': 'Session required'}), 401
        
        with session_lock:
            session = active_sessions.get(session_id)
            if not session:
                return jsonify({'error': 'Invalid or expired session'}), 401
            
            # Update last activity
            session['last_activity'] = datetime.now(timezone.utc)
            
            # Attach user information to request for use in route handlers
            request.current_user = session
            request.session_id = session_id
        
        return f(*args, **kwargs)
    return decorated_function

# Initialize database
try:
    db = UserDatabase(SQLITE_PATH)
    print(f"Database successfully initialized: {SQLITE_PATH}")
except Exception as e:
    print(f"Failed to initialize database: {e}")
    db = None

# Start cleanup thread
cleanup_thread = threading.Thread(target=cleanup_expired_sessions, daemon=True)
cleanup_thread.start()

# ============================================================================
# ROUTES
# ============================================================================

@app.route('/login', methods=['GET'])
def login_page():
    """Serve login page"""
    try:
        with open('login.html', 'r') as f:
            return Response(
                f.read(),
                mimetype='text/html',
                headers={
                    'Cache-Control': 'no-store, no-cache, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            )
    except FileNotFoundError:
        return jsonify({'error': 'Login page not found'}), 404

@app.route('/api/admin/login', methods=['POST'])
def login():
    """Enhanced login endpoint with comprehensive error handling"""
    ip_address = request.environ.get('HTTP_X_FORWARDED_FOR', request.remote_addr)
    
    if is_rate_limited(ip_address):
        return jsonify({'error': 'Too many login attempts. Please try again later.'}), 429
    
    try:
        data = request.get_json()
        username = data.get('username', '').strip()
        password = data.get('password', '')
        
        if not username or not password:
            return jsonify({'error': 'Username and password required'}), 400
        
        if not db:
            return jsonify({'error': 'Database not available'}), 503
        
        user = db.verify_user(username, password)
        if not user:
            return jsonify({'error': 'Invalid username or password'}), 401
        
        # Create session
        session_id = generate_session_id()
        session_data = {
            'user_id': user['id'],
            'username': user['username'],
            'display_name': user['display_name'],
            'role': user['role'],
            'ip_address': ip_address,
            'created_at': datetime.now(timezone.utc),
            'last_activity': datetime.now(timezone.utc)
        }
        
        with session_lock:
            active_sessions[session_id] = session_data
        
        # Log successful login
        db.log_audit_event(
            user['id'], 
            'auth.login', 
            username, 
            'Session manager login successful', 
            ip_address
        )
        
        response = jsonify({
            'authenticated': True,
            'user': {
                'username': user['username'],
                'displayName': user['display_name'],
                'role': user['role'],
                'mfaConfigured': False
            },
            'sessionId': session_id,
            'sessionTimeout': SESSION_TIMEOUT
        })
        
        response.headers['X-Session-ID'] = session_id
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
        
        return response
        
    except Exception as e:
        print(f"Login error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/admin/check-session', methods=['GET'])
@require_session
def check_session():
    """Check if session is valid"""
    return jsonify({
        'authenticated': True,
        'user': request.current_user,
        'sessionTimeout': SESSION_TIMEOUT
    })

@app.route('/api/admin/keep-alive', methods=['POST'])
@require_session
def keep_alive():
    """Update session activity timestamp"""
    with session_lock:
        if request.session_id in active_sessions:
            active_sessions[request.session_id]['last_activity'] = datetime.now(timezone.utc)
    
    return jsonify({'status': 'session updated'})

@app.route('/api/admin/logout', methods=['POST'])
@require_session
def logout():
    """Logout and destroy session"""
    session_id = request.session_id
    user = request.current_user
    
    # Log logout
    if db and user:
        db.log_audit_event(
            user.get('user_id'), 
            'auth.logout', 
            user.get('username'), 
            'Session manager logout successful', 
            request.environ.get('HTTP_X_FORWARDED_FOR', request.remote_addr)
        )
    
    # Remove session
    with session_lock:
        if session_id in active_sessions:
            del active_sessions[session_id]
    
    response = jsonify({'authenticated': False})
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    
    return response

@app.route('/api/admin/health', methods=['GET'])
def health_check():
    """Comprehensive health check endpoint"""
    try:
        # Check database connection
        if db:
            conn = db._get_connection()
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute("SELECT COUNT(*) FROM users WHERE is_active = 1")
            result = cursor.fetchone()
            active_users = result[0] if result else 0
            db._return_connection(conn)
            
            return jsonify({
                'status': 'healthy',
                'active_sessions': len(active_sessions),
                'active_users': active_users,
                'session_timeout': SESSION_TIMEOUT,
                'uptime': time.time() - start_time if 'start_time' in globals() else 0,
                'database_connected': True,
                'timestamp': datetime.now(timezone.utc).isoformat()
            })
        else:
            return jsonify({
                'status': 'degraded',
                'active_sessions': len(active_sessions),
                'active_users': 0,
                'session_timeout': SESSION_TIMEOUT,
                'uptime': time.time() - start_time if 'start_time' in globals() else 0,
                'database_connected': False,
                'timestamp': datetime.now(timezone.utc).isoformat(),
                'error': 'Database not initialized'
            })
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'active_sessions': len(active_sessions),
            'active_users': 0,
            'session_timeout': SESSION_TIMEOUT,
            'database_connected': False,
            'timestamp': datetime.now(timezone.utc).isoformat(),
            'error': str(e)
        }), 500

@app.route('/api/admin/gallery/photos', methods=['GET'])
def get_gallery_photos():
    """Get all gallery photos for display"""
    try:
        # Get list of uploaded gallery photos
        gallery_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../public/uploads/gallery')
        photos = []
        
        if os.path.exists(gallery_path):
            for filename in os.listdir(gallery_path):
                if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                    file_path = os.path.join(gallery_path, filename)
                    if os.path.isfile(file_path):
                        stat = os.stat(file_path)
                        
                        # Extract file info
                        photos.append({
                            'id': filename.replace('.', '_').replace('-', ' '),
                            'title': filename.replace('-', ' ').replace('_', ' ').title(),
                            'description': f'Professional photography from various events and conferences',
                            'image_url': f'/uploads/gallery/{filename}',
                            'thumbnail_url': f'/uploads/gallery/{filename}',
                            'upload_date': datetime.fromtimestamp(stat.st_mtime).isoformat(),
                            'file_size': stat.st_size,
                            'dimensions': {
                                'width': 800,  # Default width
                                'height': 600   # Default height
                            },
                            'category': 'professional',
                            'tags': ['photography', 'professional']
                        })
        
        return jsonify({'photos': photos})
    except Exception as e:
        print(f"Gallery API error: {e}")
        return jsonify({'error': 'Failed to load gallery photos'}), 500

# ============================================================================
# MEDIA MANAGEMENT API
# ============================================================================

import json
import uuid
from werkzeug.utils import secure_filename

# Media storage paths
MEDIA_ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../public/uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp', 'pdf', 'doc', 'docx', 'txt', 'mp4', 'avi', 'mov'}
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_media_type(filename):
    ext = filename.rsplit('.', 1)[1].lower()
    if ext in ['png', 'jpg', 'jpeg', 'gif', 'webp']:
        return 'image'
    elif ext in ['mp4', 'avi', 'mov']:
        return 'video'
    elif ext in ['pdf', 'doc', 'docx', 'txt']:
        return 'document'
    else:
        return 'file'

def ensure_media_directories():
    dirs = ['images', 'videos', 'documents', 'thumbnails']
    for dir_name in dirs:
        os.makedirs(os.path.join(MEDIA_ROOT, dir_name), exist_ok=True)

def load_media_library():
    """Load media library from JSON file"""
    try:
        with open(os.path.join(os.path.dirname(__file__), 'data/media-library.json'), 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

def save_media_library(media_data):
    """Save media library to JSON file"""
    try:
        with open(os.path.join(os.path.dirname(__file__), 'data/media-library.json'), 'w') as f:
            json.dump(media_data, f, indent=2)
        return True
    except Exception as e:
        print(f"Error saving media library: {e}")
        return False

@app.route('/api/media', methods=['GET'])
@require_session
def get_media_files():
    """Get all media files"""
    try:
        media_data = load_media_library()
        
        # Add file size and URL information
        for item in media_data:
            file_path = os.path.join(MEDIA_ROOT, item['fileName'].lstrip('/'))
            if os.path.exists(file_path):
                item['size'] = os.path.getsize(file_path)
                item['url'] = item['fileName']
                item['type'] = get_media_type(item['fileName'])
        
        return jsonify({'media': media_data})
    except Exception as e:
        print(f"Error getting media files: {e}")
        return jsonify({'error': 'Failed to load media files'}), 500

@app.route('/api/media', methods=['POST'])
@require_session
def upload_media():
    """Upload a new media file"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'File type not allowed'}), 400
        
        # Check file size
        file.seek(0, os.SEEK_END)
        file_size = file.tell()
        file.seek(0)
        
        if file_size > MAX_FILE_SIZE:
            return jsonify({'error': 'File too large'}), 400
        
        # Ensure directories exist
        ensure_media_directories()
        
        # Secure filename and generate unique ID
        filename = secure_filename(file.filename)
        file_id = str(uuid.uuid4())
        file_ext = filename.rsplit('.', 1)[1].lower()
        media_type = get_media_type(filename)
        
        # Determine storage path
        if media_type == 'image':
            storage_dir = 'images'
        elif media_type == 'video':
            storage_dir = 'videos'
        else:
            storage_dir = 'documents'
        
        # Save file
        storage_filename = f"{file_id}.{file_ext}"
        storage_path = os.path.join(MEDIA_ROOT, storage_dir, storage_filename)
        file.save(storage_path)
        
        # Create thumbnail for images
        thumbnail_url = None
        if media_type == 'image':
            try:
                from PIL import Image
                img = Image.open(storage_path)
                img.thumbnail((200, 200))
                thumbnail_path = os.path.join(MEDIA_ROOT, 'thumbnails', f"{file_id}_thumb.{file_ext}")
                img.save(thumbnail_path)
                thumbnail_url = f"/uploads/thumbnails/{file_id}_thumb.{file_ext}"
            except ImportError:
                print("PIL not available, skipping thumbnail generation")
            except Exception as e:
                print(f"Error creating thumbnail: {e}")
        
        # Create media record
        media_record = {
            "id": file_id,
            "fileName": f"/uploads/{storage_dir}/{storage_filename}",
            "url": f"/uploads/{storage_dir}/{storage_filename}",
            "thumbnail": thumbnail_url,
            "altText": request.form.get('altText', ''),
            "contentType": file.content_type,
            "size": file_size,
            "type": media_type,
            "uploadedAt": datetime.now(timezone.utc).isoformat(),
            "tags": request.form.get('tags', '').split(',') if request.form.get('tags') else []
        }
        
        # Save to media library
        media_data = load_media_library()
        media_data.append(media_record)
        save_media_library(media_data)
        
        return jsonify({'media': media_record, 'message': 'File uploaded successfully'})
        
    except Exception as e:
        print(f"Error uploading file: {e}")
        return jsonify({'error': 'Failed to upload file'}), 500

@app.route('/api/media/<media_id>', methods=['DELETE'])
@require_session
def delete_media(media_id):
    """Delete a media file"""
    try:
        media_data = load_media_library()
        
        # Find media item
        media_item = None
        for item in media_data:
            if item['id'] == media_id:
                media_item = item
                break
        
        if not media_item:
            return jsonify({'error': 'Media file not found'}), 404
        
        # Delete physical file
        file_path = os.path.join(MEDIA_ROOT, media_item['fileName'].lstrip('/uploads/'))
        if os.path.exists(file_path):
            os.remove(file_path)
        
        # Delete thumbnail if exists
        if media_item.get('thumbnail'):
            thumbnail_path = os.path.join(MEDIA_ROOT, media_item['thumbnail'].lstrip('/uploads/'))
            if os.path.exists(thumbnail_path):
                os.remove(thumbnail_path)
        
        # Remove from media library
        media_data = [item for item in media_data if item['id'] != media_id]
        save_media_library(media_data)
        
        return jsonify({'message': 'Media file deleted successfully'})
        
    except Exception as e:
        print(f"Error deleting media file: {e}")
        return jsonify({'error': 'Failed to delete media file'}), 500

@app.route('/api/media/<media_id>/download', methods=['GET'])
@require_session
def download_media(media_id):
    """Download a media file"""
    try:
        media_data = load_media_library()
        
        # Find media item
        media_item = None
        for item in media_data:
            if item['id'] == media_id:
                media_item = item
                break
        
        if not media_item:
            return jsonify({'error': 'Media file not found'}), 404
        
        file_path = os.path.join(MEDIA_ROOT, media_item['fileName'].lstrip('/uploads/'))
        if not os.path.exists(file_path):
            return jsonify({'error': 'File not found'}), 404
        
        return send_file(file_path, as_attachment=True, download_name=media_item['fileName'].split('/')[-1])
        
    except Exception as e:
        print(f"Error downloading media file: {e}")
        return jsonify({'error': 'Failed to download media file'}), 500

# ============================================================================
# PASSPORT PHOTO MANAGEMENT
# ============================================================================

def ensure_passport_photo_directory():
    """Ensure passport photo directory exists"""
    if not os.path.exists(PASSPORT_PHOTO_DIR):
        os.makedirs(PASSPORT_PHOTO_DIR, exist_ok=True)

def validate_passport_photo(file):
    """Validate passport photo file"""
    # Check file size
    if len(file.read()) > PASSPORT_PHOTO_MAX_SIZE:
        return False, "File size exceeds 5MB limit"
    
    # Reset file pointer
    file.seek(0)
    
    # Check file type
    if file.content_type not in PASSPORT_PHOTO_ALLOWED_TYPES:
        return False, "Only JPEG and PNG files are allowed"
    
    # Validate image dimensions
    try:
        image = Image.open(file)
        width, height = image.size
        
        if width < PASSPORT_PHOTO_MIN_DIMENSION or height < PASSPORT_PHOTO_MIN_DIMENSION:
            return False, f"Image dimensions must be at least {PASSPORT_PHOTO_MIN_DIMENSION}x{PASSPORT_PHOTO_MIN_DIMENSION} pixels"
        
        if width > PASSPORT_PHOTO_MAX_DIMENSION or height > PASSPORT_PHOTO_MAX_DIMENSION:
            return False, f"Image dimensions must not exceed {PASSPORT_PHOTO_MAX_DIMENSION}x{PASSPORT_PHOTO_MAX_DIMENSION} pixels"
        
        # Reset file pointer
        file.seek(0)
        
    except Exception as e:
        return False, "Invalid image file"
    
    return True, "Valid passport photo"

def resize_passport_photo(image, max_size=PASSPORT_PHOTO_MAX_DIMENSION):
    """Resize passport photo if needed"""
    width, height = image.size
    
    if width <= max_size and height <= max_size:
        return image
    
    # Calculate new dimensions maintaining aspect ratio
    if width > height:
        new_width = max_size
        new_height = int(height * (max_size / width))
    else:
        new_height = max_size
        new_width = int(width * (max_size / height))
    
    return image.resize((new_width, new_height), Image.Resampling.LANCZOS)

@app.route('/api/admin/passport-photo/upload', methods=['POST'])
@require_session
def upload_passport_photo():
    """Upload passport photo"""
    try:
        ensure_passport_photo_directory()
        
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Validate file
        is_valid, message = validate_passport_photo(file)
        if not is_valid:
            return jsonify({'error': message}), 400
        
        # Generate unique filename
        file_extension = os.path.splitext(file.filename)[1].lower()
        unique_filename = f"passport_{uuid.uuid4().hex}{file_extension}"
        file_path = os.path.join(PASSPORT_PHOTO_DIR, unique_filename)
        
        # Process and save image
        image = Image.open(file)
        
        # Convert to RGB if necessary
        if image.mode in ('RGBA', 'LA', 'P'):
            rgb_image = Image.new('RGB', image.size, (255, 255, 255))
            if image.mode == 'P':
                image = image.convert('RGBA')
            rgb_image.paste(image, mask=image.split()[-1] if image.mode in ('RGBA', 'LA') else None)
            image = rgb_image
        
        # Resize if needed
        image = resize_passport_photo(image)
        
        # Save optimized image
        image.save(file_path, 'JPEG', quality=85, optimize=True)
        
        # Log upload
        if db:
            db.log_audit_event(
                request.current_user.get('user_id'),
                'passport_photo.upload',
                request.current_user.get('username'),
                f'Passport photo uploaded: {unique_filename}',
                request.environ.get('HTTP_X_FORWARDED_FOR', request.remote_addr)
            )
        
        return jsonify({
            'success': True,
            'message': 'Passport photo uploaded successfully',
            'filename': unique_filename,
            'url': f'/uploads/passport_photos/{unique_filename}'
        })
        
    except Exception as e:
        print(f"Error uploading passport photo: {e}")
        return jsonify({'error': 'Failed to upload passport photo'}), 500

@app.route('/api/admin/passport-photo', methods=['GET'])
@require_session
def get_passport_photo():
    """Get current passport photo information"""
    try:
        ensure_passport_photo_directory()
        
        # Find existing passport photo
        passport_files = []
        for filename in os.listdir(PASSPORT_PHOTO_DIR):
            if filename.startswith('passport_') and filename.lower().endswith(('.jpg', '.jpeg', '.png')):
                file_path = os.path.join(PASSPORT_PHOTO_DIR, filename)
                file_stat = os.stat(file_path)
                
                passport_files.append({
                    'filename': filename,
                    'url': f'/uploads/passport_photos/{filename}',
                    'size': file_stat.st_size,
                    'uploaded_at': datetime.fromtimestamp(file_stat.st_mtime, tz=timezone.utc).isoformat()
                })
        
        # Sort by upload time (newest first)
        passport_files.sort(key=lambda x: x['uploaded_at'], reverse=True)
        
        return jsonify({
            'success': True,
            'passport_photos': passport_files,
            'current_photo': passport_files[0] if passport_files else None
        })
        
    except Exception as e:
        print(f"Error getting passport photo: {e}")
        return jsonify({'error': 'Failed to get passport photo'}), 500

@app.route('/uploads/passport_photos/<filename>')
def serve_passport_photo(filename):
    """Serve passport photo files"""
    try:
        # Validate filename
        if not filename.startswith('passport_') or '..' in filename:
            return jsonify({'error': 'Invalid filename'}), 400
        
        file_path = os.path.join(PASSPORT_PHOTO_DIR, filename)
        if not os.path.exists(file_path):
            return jsonify({'error': 'Passport photo not found'}), 404
        
        return send_file(file_path, mimetype='image/jpeg')
        
    except Exception as e:
        print(f"Error serving passport photo: {e}")
        return jsonify({'error': 'Failed to serve passport photo'}), 500

@app.route('/api/admin/passport-photo/<filename>', methods=['DELETE'])
@require_session
def delete_passport_photo(filename):
    """Delete passport photo"""
    try:
        # Validate filename
        if not filename.startswith('passport_') or '..' in filename:
            return jsonify({'error': 'Invalid filename'}), 400
        
        file_path = os.path.join(PASSPORT_PHOTO_DIR, filename)
        if not os.path.exists(file_path):
            return jsonify({'error': 'Passport photo not found'}), 404
        
        # Delete file
        os.remove(file_path)
        
        # Log deletion
        if db:
            db.log_audit_event(
                request.current_user.get('user_id'),
                'passport_photo.delete',
                request.current_user.get('username'),
                f'Passport photo deleted: {filename}',
                request.environ.get('HTTP_X_FORWARDED_FOR', request.remote_addr)
            )
        
        return jsonify({
            'success': True,
            'message': 'Passport photo deleted successfully'
        })
        
    except Exception as e:
        print(f"Error deleting passport photo: {e}")
        return jsonify({'error': 'Failed to delete passport photo'}), 500

# ============================================================================
# ERROR HANDLERS
# ============================================================================

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# ============================================================================
# STARTUP
# ============================================================================

if __name__ == '__main__':
    # Global start time for uptime tracking
    start_time = time.time()
    
    print(f"🚀 Production Flask Session Manager starting on port {FLASK_PORT}")
    print(f"🔐 Session timeout: {SESSION_TIMEOUT} seconds")
    print(f"🗄️  Database: {SQLITE_PATH}")
    print(f"🌐 Allowed origin: {ALLOWED_ORIGIN}")
    
    app.run(host='0.0.0.0', port=FLASK_PORT, threaded=True)
