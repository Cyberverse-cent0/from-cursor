#!/bin/bash

# Production Backend Update Script
# This script updates the Flask backend with zero downtime

set -e  # Exit on any error

echo "🔄 Stephen Asatsa Backend Production Update"
echo "============================================"

# Configuration
SERVICE_NAME="stephenasatsa-backend"
PROJECT_PATH="/home/codecrafter/it-works-now-research-hub-implementation/apps/website/backend"
BACKUP_PATH="/home/codecrafter/backups/stephenasatsa-backend"
LOG_DIR="/var/log/stephenasatsa-backend"
SERVICE_USER="www-data"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   print_error "This script must be run as root (use sudo)"
   exit 1
fi

# Create backup directory
BACKUP_DATE=$(date +%Y%m%d_%H%M%S)
CURRENT_BACKUP="$BACKUP_PATH/$BACKUP_DATE"
mkdir -p $CURRENT_BACKUP

print_info "Starting update process..."

# Check if service is running
if ! systemctl is-active --quiet $SERVICE_NAME; then
    print_warning "Service is not currently running"
else
    print_info "Service is currently running"
fi

# Backup current version
echo "📦 Creating backup..."
cp -r $PROJECT_PATH/venv $CURRENT_BACKUP/
cp -r $PROJECT_PATH/data $CURRENT_BACKUP/
cp $PROJECT_PATH/*.py $CURRENT_BACKUP/ 2>/dev/null || true
cp $PROJECT_PATH/*.json $CURRENT_BACKUP/ 2>/dev/null || true
cp $PROJECT_PATH/requirements*.txt $CURRENT_BACKUP/ 2>/dev/null || true
print_status "Backup created at $CURRENT_BACKUP"

# Pull latest changes (if git repository)
if [ -d "$PROJECT_PATH/.git" ]; then
    echo "📥 Pulling latest changes..."
    cd $PROJECT_PATH
    git pull origin main 2>/dev/null || git pull origin master 2>/dev/null || print_warning "Git pull failed or not on main/master branch"
    print_status "Latest code pulled"
else
    print_warning "Not a git repository, skipping code update"
fi

# Update Python dependencies
echo "📚 Updating Python dependencies..."
sudo -u $SERVICE_USER $PROJECT_PATH/venv/bin/pip install --upgrade pip
sudo -u $SERVICE_USER $PROJECT_PATH/venv/bin/pip install -r $PROJECT_PATH/requirements.txt --upgrade
print_status "Dependencies updated"

# Database migration (if needed)
echo "🗄️  Checking database migrations..."
if [ -f "$PROJECT_PATH/migrate.py" ]; then
    sudo -u $SERVICE_USER $PROJECT_PATH/venv/bin/python $PROJECT_PATH/migrate.py
    print_status "Database migrations applied"
else
    print_info "No migration script found"
fi

# Update systemd service if needed
if [ -f "$PROJECT_PATH/production-backend.service" ]; then
    echo "⚙️  Updating systemd service..."
    cp $PROJECT_PATH/production-backend.service /etc/systemd/system/$SERVICE_NAME.service
    sed -i "s|/home/codecrafter/it-works-now-research-hub-implementation|$PROJECT_PATH|g" /etc/systemd/system/$SERVICE_NAME.service
    systemctl daemon-reload
    print_status "Systemd service updated"
fi

# Graceful restart with zero downtime
echo "🔄 Restarting service gracefully..."
if systemctl is-active --quiet $SERVICE_NAME; then
    # Send reload signal first (if supported)
    systemctl reload $SERVICE_NAME 2>/dev/null || print_warning "Reload not supported, will restart"
    
    # Wait a moment for reload
    sleep 2
    
    # Check if service is still responsive
    if ! curl -s -f http://localhost:5001/api/admin/health > /dev/null 2>&1; then
        print_info "Performing full restart..."
        systemctl restart $SERVICE_NAME
    else
        print_status "Service reloaded successfully"
    fi
else
    print_info "Starting service..."
    systemctl start $SERVICE_NAME
fi

# Wait for service to start
sleep 5

# Verify service is running and healthy
echo "🔍 Verifying service health..."
RETRY_COUNT=0
MAX_RETRIES=12
HEALTHY=false

while [ $RETRY_COUNT -lt $MAX_RETRIES ] && [ "$HEALTHY" = false ]; do
    if systemctl is-active --quiet $SERVICE_NAME; then
        if curl -s -f http://localhost:5001/api/admin/health > /dev/null 2>&1; then
            HEALTHY=true
            print_status "Service is healthy"
        else
            print_info "Health check failed, retrying... ($((RETRY_COUNT + 1))/$MAX_RETRIES)"
            sleep 5
        fi
    else
        print_info "Service not running, retrying... ($((RETRY_COUNT + 1))/$MAX_RETRIES)"
        sleep 5
    fi
    RETRY_COUNT=$((RETRY_COUNT + 1))
done

if [ "$HEALTHY" = false ]; then
    print_error "Service failed to start properly"
    
    # Attempt rollback
    print_info "Attempting rollback..."
    if [ -d "$CURRENT_BACKUP/venv" ]; then
        systemctl stop $SERVICE_NAME
        rm -rf $PROJECT_PATH/venv
        mv $CURRENT_BACKUP/venv $PROJECT_PATH/
        systemctl start $SERVICE_NAME
        print_warning "Rollback completed"
    fi
    
    echo "Check logs with: journalctl -u $SERVICE_NAME -f"
    exit 1
fi

# Cleanup old backups (keep last 5)
echo "🧹 Cleaning up old backups..."
cd $BACKUP_PATH
ls -t | tail -n +6 | xargs -r rm -rf
print_status "Old backups cleaned up"

# Update monitoring script if needed
if [ -f "$PROJECT_PATH/monitor-backend.sh" ]; then
    chmod +x $PROJECT_PATH/monitor-backend.sh
    print_status "Monitoring script updated"
fi

# Display update summary
echo ""
echo "🎉 Update Complete!"
echo "===================="
echo "Service: $SERVICE_NAME"
echo "Status: $(systemctl is-active $SERVICE_NAME)"
echo "Health endpoint: http://localhost:5001/api/admin/health"
echo "Backup location: $CURRENT_BACKUP"
echo ""
print_info "Service management commands:"
echo "  Start:   systemctl start $SERVICE_NAME"
echo "  Stop:    systemctl stop $SERVICE_NAME"
echo "  Restart: systemctl restart $SERVICE_NAME"
echo "  Status:  systemctl status $SERVICE_NAME"
echo "  Logs:    journalctl -u $SERVICE_NAME -f"
echo ""
print_status "Backend updated successfully!"

# Optional: Send notification (configure as needed)
# Uncomment and modify the following lines to enable notifications:
# if command -v mail &> /dev/null; then
#     echo "Backend update completed successfully at $(date)" | mail -s "Backend Update Notification" admin@stephenasatsa.com
# fi
