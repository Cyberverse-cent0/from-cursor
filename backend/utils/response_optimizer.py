"""
Response optimization utilities for Flask backend
Provides compression, minification, and field selection for API responses
"""

import json
import gzip
import logging
from typing import Dict, Any, List, Optional, Union
from functools import wraps
from flask import Response, request, jsonify

logger = logging.getLogger(__name__)

class ResponseOptimizer:
    """Utility class for optimizing API responses"""
    
    @staticmethod
    def minify_json(data: Any) -> str:
        """
        Minify JSON response by removing unnecessary whitespace
        
        Args:
            data: Data to minify
            
        Returns:
            Minified JSON string
        """
        try:
            return json.dumps(data, separators=(',', ':'), ensure_ascii=False)
        except Exception as e:
            logger.error(f"JSON minification error: {e}")
            return json.dumps(data)
    
    @staticmethod
    def compress_response(data: Union[str, bytes], encoding: str = 'utf-8') -> bytes:
        """
        Compress response data using gzip
        
        Args:
            data: Data to compress
            encoding: Text encoding
            
        Returns:
            Compressed bytes
        """
        try:
            if isinstance(data, str):
                data = data.encode(encoding)
            
            # Only compress if data is larger than 1KB
            if len(data) > 1024:
                return gzip.compress(data)
            else:
                return data
        except Exception as e:
            logger.error(f"Response compression error: {e}")
            return data if isinstance(data, bytes) else data.encode(encoding)
    
    @staticmethod
    def select_fields(data: Dict[str, Any], fields: List[str]) -> Dict[str, Any]:
        """
        Select specific fields from response data
        
        Args:
            data: Original data
            fields: List of fields to include
            
        Returns:
            Filtered data
        """
        if not fields:
            return data
            
        try:
            filtered_data = {}
            for field in fields:
                if field in data:
                    filtered_data[field] = data[field]
                # Support nested field selection (e.g., "user.name")
                elif '.' in field:
                    parts = field.split('.')
                    current = data
                    for part in parts:
                        if isinstance(current, dict) and part in current:
                            current = current[part]
                        else:
                            break
                    else:
                        # Successfully traversed all parts
                        filtered_data[field] = current
                        
            return filtered_data
        except Exception as e:
            logger.error(f"Field selection error: {e}")
            return data
    
    @staticmethod
    def add_cache_headers(response: Response, max_age: int = 300, 
                         stale_while_revalidate: int = 60,
                         must_revalidate: bool = False) -> Response:
        """
        Add cache control headers to response
        
        Args:
            response: Flask response object
            max_age: Maximum age in seconds
            stale_while_revalidate: SWR time in seconds
            must_revalidate: Whether to force revalidation
            
        Returns:
            Response with cache headers
        """
        try:
            cache_control = f"public, max-age={max_age}"
            
            if stale_while_revalidate > 0:
                cache_control += f", stale-while-revalidate={stale_while_revalidate}"
                
            if must_revalidate:
                cache_control += ", must-revalidate"
                
            response.headers['Cache-Control'] = cache_control
            response.headers['Vary'] = 'Accept-Encoding'
            
            return response
        except Exception as e:
            logger.error(f"Cache headers error: {e}")
            return response
    
    @staticmethod
    def add_compression_headers(response: Response, compressed: bool = True) -> Response:
        """
        Add compression headers to response
        
        Args:
            response: Flask response object
            compressed: Whether response is compressed
            
        Returns:
            Response with compression headers
        """
        try:
            if compressed:
                response.headers['Content-Encoding'] = 'gzip'
                response.headers['Content-Type'] = 'application/json; charset=utf-8'
            
            return response
        except Exception as e:
            logger.error(f"Compression headers error: {e}")
            return response

def optimize_response(max_age: int = 300, 
                     compress: bool = True,
                     minify: bool = True,
                     field_selection: bool = True):
    """
    Decorator for optimizing API responses
    
    Args:
        max_age: Cache max age in seconds
        compress: Whether to compress response
        minify: Whether to minify JSON
        field_selection: Whether to support field selection
    """
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            # Execute the original function
            result = func(*args, **kwargs)
            
            # Handle different response types
            if isinstance(result, Response):
                return result
            elif isinstance(result, tuple) and len(result) == 2:
                data, status_code = result
            else:
                data = result
                status_code = 200
            
            # Get optimization options from request
            accept_encoding = request.headers.get('Accept-Encoding', '')
            wants_gzip = compress and 'gzip' in accept_encoding.lower()
            
            # Field selection from query parameters
            fields = None
            if field_selection and request.args.get('fields'):
                fields = [f.strip() for f in request.args.get('fields').split(',')]
            
            # Apply field selection
            if fields and isinstance(data, dict):
                data = ResponseOptimizer.select_fields(data, fields)
            
            # Minify JSON
            json_data = ResponseOptimizer.minify_json(data) if minify else json.dumps(data)
            
            # Compress if requested and beneficial
            compressed = False
            if wants_gzip:
                compressed_data = ResponseOptimizer.compress_response(json_data)
                if len(compressed_data) < len(json_data):
                    json_data = compressed_data
                    compressed = True
            
            # Create response
            response = Response(
                json_data,
                status=status_code,
                mimetype='application/json'
            )
            
            # Add headers
            response = ResponseOptimizer.add_cache_headers(response, max_age)
            response = ResponseOptimizer.add_compression_headers(response, compressed)
            
            return response
            
        return wrapper
    return decorator

def compress_json_response(func):
    """
    Simple decorator for JSON response compression
    
    Args:
        func: Function to decorate
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        
        # Handle different response types
        if isinstance(result, Response):
            return result
        elif isinstance(result, tuple) and len(result) == 2:
            data, status_code = result
        else:
            data = result
            status_code = 200
        
        # Check if client accepts gzip
        accept_encoding = request.headers.get('Accept-Encoding', '')
        if 'gzip' not in accept_encoding.lower():
            return jsonify(data), status_code
        
        # Minify and compress
        json_data = ResponseOptimizer.minify_json(data)
        compressed_data = ResponseOptimizer.compress_response(json_data)
        
        # Create response
        response = Response(
            compressed_data,
            status=status_code,
            mimetype='application/json'
        )
        
        # Add compression headers
        response = ResponseOptimizer.add_compression_headers(response, True)
        
        return response
        
    return wrapper

def add_etag_support(func):
    """
    Decorator to add ETag support for conditional requests
    
    Args:
        func: Function to decorate
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Execute the original function
        result = func(*args, **kwargs)
        
        # Handle different response types
        if isinstance(result, Response):
            return result
        elif isinstance(result, tuple) and len(result) == 2:
            data, status_code = result
        else:
            data = result
            status_code = 200
        
        # Generate ETag from content
        json_data = json.dumps(data, sort_keys=True)
        etag = f'"{hash(json_data)}"'
        
        # Check If-None-Match header
        if_none_match = request.headers.get('If-None-Match')
        if if_none_match and if_none_match == etag:
            return Response('', status=304)  # Not Modified
        
        # Create response with ETag
        response = jsonify(data)
        response.status_code = status_code
        response.headers['ETag'] = etag
        response.headers['Cache-Control'] = 'public, max-age=300'
        
        return response
        
    return wrapper

# Convenience functions
def create_optimized_response(data: Any, 
                            status_code: int = 200,
                            max_age: int = 300,
                            compress: bool = True,
                            minify: bool = True) -> Response:
    """
    Create an optimized response
    
    Args:
        data: Response data
        status_code: HTTP status code
        max_age: Cache max age
        compress: Whether to compress
        minify: Whether to minify JSON
        
    Returns:
        Optimized Flask response
    """
    # Get optimization options
    accept_encoding = request.headers.get('Accept-Encoding', '')
    wants_gzip = compress and 'gzip' in accept_encoding.lower()
    
    # Minify JSON
    json_data = ResponseOptimizer.minify_json(data) if minify else json.dumps(data)
    
    # Compress if beneficial
    compressed = False
    if wants_gzip:
        compressed_data = ResponseOptimizer.compress_response(json_data)
        if len(compressed_data) < len(json_data):
            json_data = compressed_data
            compressed = True
    
    # Create response
    response = Response(
        json_data,
        status=status_code,
        mimetype='application/json'
    )
    
    # Add headers
    response = ResponseOptimizer.add_cache_headers(response, max_age)
    response = ResponseOptimizer.add_compression_headers(response, compressed)
    
    return response

def get_client_info() -> Dict[str, str]:
    """
    Get client information for optimization decisions
    
    Returns:
        Dictionary with client info
    """
    return {
        'user_agent': request.headers.get('User-Agent', ''),
        'accept_encoding': request.headers.get('Accept-Encoding', ''),
        'accept_language': request.headers.get('Accept-Language', ''),
        'connection': request.headers.get('Connection', ''),
        'x_forwarded_for': request.headers.get('X-Forwarded-For', ''),
    }
