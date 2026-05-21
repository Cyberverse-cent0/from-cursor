/**
 * Client-side cache manager for intelligent caching strategy
 * Supports localStorage, sessionStorage, and in-memory caching
 */

export interface CacheStrategy {
  ttl: number; // Time to live in seconds
  staleWhileRevalidate: number; // Time to serve stale content while revalidating
  mustRevalidate: boolean; // Force revalidation after expiry
  priority: 'high' | 'medium' | 'low';
}

export interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  ttl: number;
  staleWhileRevalidate: number;
  mustRevalidate: boolean;
  etag?: string;
  lastModified?: string;
}

export interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  hitRate: number;
}

// Predefined cache strategies for different content types
export const CacheStrategies = {
  // Static content - long cache times
  STATIC: { ttl: 86400, staleWhileRevalidate: 3600, mustRevalidate: false, priority: 'low' as const },
  
  // Dynamic content - medium cache times
  DYNAMIC: { ttl: 900, staleWhileRevalidate: 300, mustRevalidate: false, priority: 'medium' as const },
  
  // Real-time content - short cache times
  REALTIME: { ttl: 60, staleWhileRevalidate: 30, mustRevalidate: true, priority: 'high' as const },
  
  // User-specific content - very short cache
  USER_SPECIFIC: { ttl: 300, staleWhileRevalidate: 60, mustRevalidate: true, priority: 'high' as const },
  
  // API responses - configurable based on endpoint
  API_RESPONSE: { ttl: 600, staleWhileRevalidate: 180, mustRevalidate: false, priority: 'medium' as const },
};

class CacheManager {
  private memoryCache = new Map<string, CacheEntry>();
  private stats: CacheStats = { hits: 0, misses: 0, size: 0, hitRate: 0 };
  private readonly MAX_MEMORY_SIZE = 50; // Max items in memory cache
  private readonly STORAGE_PREFIX = 'app_cache_';

  /**
   * Get data from cache with fallback strategy
   */
  async get<T = any>(key: string, strategy: CacheStrategy): Promise<T | null> {
    try {
      // Try memory cache first (fastest)
      const memoryEntry = this.memoryCache.get(key);
      if (memoryEntry && this.isValid(memoryEntry)) {
        this.stats.hits++;
        this.updateStats();
        return memoryEntry.data;
      }

      // Try localStorage next
      const storageKey = this.getStorageKey(key);
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const entry: CacheEntry<T> = JSON.parse(stored);
        if (this.isValid(entry)) {
          // Promote to memory cache
          this.setMemoryCache(key, entry);
          this.stats.hits++;
          this.updateStats();
          return entry.data;
        } else {
          // Remove expired entry
          localStorage.removeItem(storageKey);
        }
      }

      this.stats.misses++;
      this.updateStats();
      return null;
    } catch (error) {
      console.warn('Cache get error:', error);
      this.stats.misses++;
      this.updateStats();
      return null;
    }
  }

  /**
   * Set data in cache with strategy
   */
  async set<T = any>(key: string, data: T, strategy: CacheStrategy): Promise<void> {
    try {
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        ttl: strategy.ttl,
        staleWhileRevalidate: strategy.staleWhileRevalidate,
        mustRevalidate: strategy.mustRevalidate,
      };

      // Set in memory cache
      this.setMemoryCache(key, entry);

      // Set in localStorage for persistence
      const storageKey = this.getStorageKey(key);
      localStorage.setItem(storageKey, JSON.stringify(entry));

      this.updateStats();
    } catch (error) {
      console.warn('Cache set error:', error);
    }
  }

  /**
   * Invalidate cache entries matching pattern
   */
  async invalidate(pattern: string): Promise<void> {
    try {
      // Clear memory cache
      for (const key of this.memoryCache.keys()) {
        if (key.includes(pattern)) {
          this.memoryCache.delete(key);
        }
      }

      // Clear localStorage
      const keys = Object.keys(localStorage);
      for (const key of keys) {
        if (key.startsWith(this.STORAGE_PREFIX) && key.includes(pattern)) {
          localStorage.removeItem(key);
        }
      }

      this.updateStats();
    } catch (error) {
      console.warn('Cache invalidate error:', error);
    }
  }

  /**
   * Clear all cache
   */
  async clear(): Promise<void> {
    try {
      this.memoryCache.clear();
      const keys = Object.keys(localStorage);
      for (const key of keys) {
        if (key.startsWith(this.STORAGE_PREFIX)) {
          localStorage.removeItem(key);
        }
      }
      this.stats = { hits: 0, misses: 0, size: 0, hitRate: 0 };
    } catch (error) {
      console.warn('Cache clear error:', error);
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    return { ...this.stats };
  }

  /**
   * Check if cache entry is still valid
   */
  private isValid(entry: CacheEntry): boolean {
    const now = Date.now();
    const age = (now - entry.timestamp) / 1000; // Age in seconds
    
    // If within TTL, it's valid
    if (age < entry.ttl) {
      return true;
    }
    
    // If within stale-while-revalidate window, it's still usable
    if (age < entry.ttl + entry.staleWhileRevalidate) {
      return true;
    }
    
    return false;
  }

  /**
   * Set entry in memory cache with size management
   */
  private setMemoryCache(key: string, entry: CacheEntry): void {
    // Remove oldest entry if cache is full
    if (this.memoryCache.size >= this.MAX_MEMORY_SIZE) {
      const oldestKey = this.memoryCache.keys().next().value;
      if (oldestKey) {
        this.memoryCache.delete(oldestKey);
      }
    }
    
    this.memoryCache.set(key, entry);
  }

  /**
   * Get localStorage key with prefix
   */
  private getStorageKey(key: string): string {
    return `${this.STORAGE_PREFIX}${key}`;
  }

  /**
   * Update cache statistics
   */
  private updateStats(): void {
    this.stats.size = this.memoryCache.size + Object.keys(localStorage).filter(k => 
      k.startsWith(this.STORAGE_PREFIX)
    ).length;
    
    const total = this.stats.hits + this.stats.misses;
    this.stats.hitRate = total > 0 ? (this.stats.hits / total) * 100 : 0;
  }

  /**
   * Check if entry needs revalidation
   */
  needsRevalidation(key: string): boolean {
    const entry = this.memoryCache.get(key);
    if (!entry) return true;
    
    const age = (Date.now() - entry.timestamp) / 1000;
    return age > entry.ttl;
  }

  /**
   * Get stale data if available (for background refresh)
   */
  getStaleData<T = any>(key: string): T | null {
    const entry = this.memoryCache.get(key);
    if (!entry) return null;
    
    const age = (Date.now() - entry.timestamp) / 1000;
    if (age > entry.ttl && age < entry.ttl + entry.staleWhileRevalidate) {
      return entry.data;
    }
    
    return null;
  }
}

// Export singleton instance
export const cacheManager = new CacheManager();

// Export convenience functions for common operations
export const getCachedData = async <T = any>(
  key: string, 
  strategy: CacheStrategy = CacheStrategies.API_RESPONSE
): Promise<T | null> => {
  return cacheManager.get<T>(key, strategy);
};

export const setCachedData = async <T = any>(
  key: string, 
  data: T, 
  strategy: CacheStrategy = CacheStrategies.API_RESPONSE
): Promise<void> => {
  return cacheManager.set(key, data, strategy);
};

export const invalidateCache = async (pattern: string): Promise<void> => {
  return cacheManager.invalidate(pattern);
};

export const clearCache = async (): Promise<void> => {
  return cacheManager.clear();
};

export const getCacheStats = (): CacheStats => {
  return cacheManager.getStats();
};
