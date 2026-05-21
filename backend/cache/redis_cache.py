"""
Redis caching layer for Flask backend
Provides intelligent caching with TTL, invalidation, and performance monitoring
"""

import json
import pickle
import time
import logging
from typing import Any, Optional, Dict, List, Union
from datetime import datetime, timedelta
import redis
from functools import wraps

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class CacheStats:
    """Cache statistics tracking"""
    def __init__(self):
        self.hits = 0
        self.misses = 0
        self.sets = 0
        self.deletes = 0
        self.errors = 0
        self.total_requests = 0
        
    def get_hit_rate(self) -> float:
        """Calculate cache hit rate percentage"""
        total = self.hits + self.misses
        return (self.hits / total * 100) if total > 0 else 0.0
        
    def to_dict(self) -> Dict[str, Union[int, float]]:
        """Convert stats to dictionary"""
        return {
            'hits': self.hits,
            'misses': self.misses,
            'sets': self.sets,
            'deletes': self.deletes,
            'errors': self.errors,
            'hit_rate': self.get_hit_rate(),
            'total_requests': self.total_requests
        }

class RedisCache:
    """Redis cache implementation with intelligent features"""
    
    def __init__(self, 
                 host: str = 'localhost',
                 port: int = 6379,
                 db: int = 0,
                 password: Optional[str] = None,
                 default_ttl: int = 3600,
                 key_prefix: str = 'app_cache:'):
        """
        Initialize Redis cache connection
        
        Args:
            host: Redis host
            port: Redis port
            db: Redis database number
            password: Redis password
            default_ttl: Default TTL in seconds
            key_prefix: Prefix for all cache keys
        """
        self.host = host
        self.port = port
        self.db = db
        self.password = password
        self.default_ttl = default_ttl
        self.key_prefix = key_prefix
        self.stats = CacheStats()
        
        try:
            self.client = redis.Redis(
                host=host,
                port=port,
                db=db,
                password=password,
                decode_responses=False,  # Handle binary data
                socket_timeout=5,
                socket_connect_timeout=5,
                retry_on_timeout=True
            )
            # Test connection
            self.client.ping()
            logger.info("Redis cache connected successfully")
        except Exception as e:
            logger.error(f"Failed to connect to Redis: {e}")
            self.client = None
            
    def _make_key(self, key: str) -> str:
        """Create full cache key with prefix"""
        return f"{self.key_prefix}{key}"
        
    def _serialize(self, data: Any) -> bytes:
        """Serialize data for storage"""
        try:
            return pickle.dumps(data)
        except Exception as e:
            logger.error(f"Serialization error: {e}")
            # Fallback to JSON
            return json.dumps(data).encode('utf-8')
            
    def _deserialize(self, data: bytes) -> Any:
        """Deserialize data from storage"""
        try:
            return pickle.loads(data)
        except Exception:
            # Fallback to JSON
            try:
                return json.loads(data.decode('utf-8'))
            except Exception as e:
                logger.error(f"Deserialization error: {e}")
                return None
                
    def is_available(self) -> bool:
        """Check if Redis is available"""
        if not self.client:
            return False
        try:
            self.client.ping()
            return True
        except Exception:
            return False
            
    def get(self, key: str) -> Optional[Any]:
        """
        Get value from cache
        
        Args:
            key: Cache key
            
        Returns:
            Cached value or None if not found
        """
        if not self.is_available():
            self.stats.misses += 1
            self.stats.total_requests += 1
            return None
            
        try:
            full_key = self._make_key(key)
            data = self.client.get(full_key)
            
            if data is not None:
                self.stats.hits += 1
                self.stats.total_requests += 1
                logger.debug(f"Cache hit for key: {key}")
                return self._deserialize(data)
            else:
                self.stats.misses += 1
                self.stats.total_requests += 1
                logger.debug(f"Cache miss for key: {key}")
                return None
                
        except Exception as e:
            self.stats.errors += 1
            self.stats.total_requests += 1
            logger.error(f"Cache get error for key {key}: {e}")
            return None
            
    def set(self, key: str, value: Any, ttl: Optional[int] = None) -> bool:
        """
        Set value in cache
        
        Args:
            key: Cache key
            value: Value to cache
            ttl: Time to live in seconds (uses default if None)
            
        Returns:
            True if successful, False otherwise
        """
        if not self.is_available():
            return False
            
        try:
            full_key = self._make_key(key)
            serialized_data = self._serialize(value)
            cache_ttl = ttl or self.default_ttl
            
            result = self.client.setex(full_key, cache_ttl, serialized_data)
            
            if result:
                self.stats.sets += 1
                logger.debug(f"Cache set for key: {key}, TTL: {cache_ttl}s")
                return True
            else:
                self.stats.errors += 1
                return False
                
        except Exception as e:
            self.stats.errors += 1
            logger.error(f"Cache set error for key {key}: {e}")
            return False
            
    def delete(self, key: str) -> bool:
        """
        Delete key from cache
        
        Args:
            key: Cache key
            
        Returns:
            True if successful, False otherwise
        """
        if not self.is_available():
            return False
            
        try:
            full_key = self._make_key(key)
            result = self.client.delete(full_key)
            
            if result:
                self.stats.deletes += 1
                logger.debug(f"Cache delete for key: {key}")
                return True
            else:
                return False
                
        except Exception as e:
            self.stats.errors += 1
            logger.error(f"Cache delete error for key {key}: {e}")
            return False
            
    def invalidate_pattern(self, pattern: str) -> int:
        """
        Invalidate keys matching pattern
        
        Args:
            pattern: Pattern to match (e.g., "user:*")
            
        Returns:
            Number of keys deleted
        """
        if not self.is_available():
            return 0
            
        try:
            full_pattern = self._make_key(pattern)
            keys = self.client.keys(full_pattern)
            
            if keys:
                deleted = self.client.delete(*keys)
                self.stats.deletes += deleted
                logger.info(f"Invalidated {deleted} keys matching pattern: {pattern}")
                return deleted
            return 0
            
        except Exception as e:
            self.stats.errors += 1
            logger.error(f"Cache invalidate pattern error for {pattern}: {e}")
            return 0
            
    def exists(self, key: str) -> bool:
        """
        Check if key exists in cache
        
        Args:
            key: Cache key
            
        Returns:
            True if key exists, False otherwise
        """
        if not self.is_available():
            return False
            
        try:
            full_key = self._make_key(key)
            return bool(self.client.exists(full_key))
        except Exception as e:
            self.stats.errors += 1
            logger.error(f"Cache exists error for key {key}: {e}")
            return False
            
    def get_ttl(self, key: str) -> int:
        """
        Get remaining TTL for key
        
        Args:
            key: Cache key
            
        Returns:
            Remaining TTL in seconds, -1 if no expiration, -2 if key doesn't exist
        """
        if not self.is_available():
            return -2
            
        try:
            full_key = self._make_key(key)
            return self.client.ttl(full_key)
        except Exception as e:
            self.stats.errors += 1
            logger.error(f"Cache TTL error for key {key}: {e}")
            return -2
            
    def get_stats(self) -> Dict[str, Union[int, float]]:
        """
        Get cache statistics
        
        Returns:
            Dictionary with cache statistics
        """
        stats = self.stats.to_dict()
        
        # Add Redis info if available
        if self.is_available():
            try:
                info = self.client.info()
                stats['redis_memory_used'] = info.get('used_memory_human', 'N/A')
                stats['redis_connected_clients'] = info.get('connected_clients', 'N/A')
                stats['redis_keyspace_hits'] = info.get('keyspace_hits', 0)
                stats['redis_keyspace_misses'] = info.get('keyspace_misses', 0)
            except Exception as e:
                logger.error(f"Error getting Redis info: {e}")
                
        return stats
        
    def clear(self) -> bool:
        """
        Clear all cache entries with the current prefix
        
        Returns:
            True if successful, False otherwise
        """
        if not self.is_available():
            return False
            
        try:
            pattern = self._make_key("*")
            keys = self.client.keys(pattern)
            
            if keys:
                self.client.delete(*keys)
                logger.info(f"Cleared {len(keys)} cache entries")
                
            return True
            
        except Exception as e:
            self.stats.errors += 1
            logger.error(f"Cache clear error: {e}")
            return False

# Global cache instance
cache = RedisCache()

# Cache decorators for easy use

def cache_result(ttl: int = 3600, key_prefix: str = "", invalidate_on: List[str] = None):
    """
    Decorator to cache function results
    
    Args:
        ttl: Time to live in seconds
        key_prefix: Prefix for cache key
        invalidate_on: List of patterns to invalidate when function is called
    """
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            # Generate cache key
            cache_key = f"{key_prefix}{func.__name__}:{hash(str(args) + str(sorted(kwargs.items())))}"
            
            # Try to get from cache
            cached_result = cache.get(cache_key)
            if cached_result is not None:
                return cached_result
                
            # Execute function and cache result
            result = func(*args, **kwargs)
            cache.set(cache_key, result, ttl)
            
            # Invalidate specified patterns
            if invalidate_on:
                for pattern in invalidate_on:
                    cache.invalidate_pattern(pattern)
                    
            return result
        return wrapper
    return decorator

def cache_api_response(ttl: int = 300, content_type: str = "json"):
    """
    Decorator specifically for API responses
    
    Args:
        ttl: Time to live in seconds
        content_type: Type of content being cached
    """
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            # Generate cache key based on endpoint and parameters
            from flask import request
            endpoint = request.endpoint or 'unknown'
            method = request.method
            path = request.path
            args_str = str(sorted(request.args.items()))
            
            cache_key = f"api:{content_type}:{method}:{path}:{hash(args_str)}"
            
            # Check for cache bypass headers
            if request.headers.get('Cache-Control') == 'no-cache':
                cache.invalidate_pattern(f"api:{content_type}:{method}:{path}:*")
                
            # Try to get from cache
            cached_response = cache.get(cache_key)
            if cached_response is not None:
                logger.info(f"API cache hit for {method} {path}")
                return cached_response
                
            # Execute function and cache result
            result = func(*args, **kwargs)
            
            # Only cache successful responses
            if hasattr(result, 'status_code') and result.status_code == 200:
                cache.set(cache_key, result, ttl)
                logger.info(f"API cache set for {method} {path}")
                
            return result
        return wrapper
    return decorator

# Convenience functions
def get_cached_data(key: str) -> Optional[Any]:
    """Get data from cache"""
    return cache.get(key)

def set_cached_data(key: str, data: Any, ttl: Optional[int] = None) -> bool:
    """Set data in cache"""
    return cache.set(key, data, ttl)

def delete_cached_data(key: str) -> bool:
    """Delete data from cache"""
    return cache.delete(key)

def invalidate_cache_pattern(pattern: str) -> int:
    """Invalidate cache entries matching pattern"""
    return cache.invalidate_pattern(pattern)

def get_cache_stats() -> Dict[str, Union[int, float]]:
    """Get cache statistics"""
    return cache.get_stats()
