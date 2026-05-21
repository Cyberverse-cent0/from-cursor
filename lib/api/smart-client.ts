/**
 * Smart API client with request deduplication, batching, and caching integration
 * Optimizes API calls to reduce traffic and improve performance
 */

import { cacheManager, CacheStrategies, getCachedData, setCachedData } from '../cache/cache-manager';

export interface SmartRequestOptions {
  cacheStrategy?: 'static' | 'dynamic' | 'realtime' | 'user-specific';
  priority?: 'high' | 'medium' | 'low';
  retryCount?: number;
  timeout?: number;
  method?: string;
}

export interface BatchRequest {
  id: string;
  url: string;
  options?: SmartRequestOptions;
}

export interface BatchResponse {
  id: string;
  data?: any;
  error?: string;
  status: number;
}

interface PendingRequest {
  promise: Promise<Response>;
  timestamp: number;
  abortController: AbortController;
}

class SmartApiClient {
  private pendingRequests = new Map<string, PendingRequest>();
  private batchQueue: BatchRequest[] = [];
  private batchTimer: NodeJS.Timeout | null = null;
  private readonly BATCH_DELAY = 50; // ms to wait for batch requests
  private readonly MAX_BATCH_SIZE = 10;
  private readonly DEFAULT_TIMEOUT = 10000; // 10 seconds

  /**
   * Make a smart API request with caching and deduplication
   */
  async request<T = any>(url: string, options: SmartRequestOptions = {}, requestInit: RequestInit = {}): Promise<T> {
    const {
      cacheStrategy = 'dynamic',
      priority = 'medium',
      retryCount = 2,
      timeout = this.DEFAULT_TIMEOUT,
    } = options;

    // Create cache key
    const cacheKey = this.getCacheKey(url, requestInit);
    
    // Try to get from cache first
    if (cacheStrategy !== 'realtime') {
      const strategyKey = cacheStrategy.toUpperCase() as keyof typeof CacheStrategies;
      const cachedData = await getCachedData<T>(cacheKey, CacheStrategies[strategyKey]);
      if (cachedData) {
        console.debug(`Cache hit for ${url}`);
        return cachedData;
      }
    }

    // Check for duplicate request
    const requestKey = this.getRequestKey(url, requestInit);
    if (this.pendingRequests.has(requestKey)) {
      console.debug(`Deduplicating request for ${url}`);
      const pending = this.pendingRequests.get(requestKey)!;
      const response = await pending.promise;
      return await this.parseResponse<T>(response);
    }

    // Create abort controller for timeout
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), timeout);

    try {
      // Create the request promise
      const requestPromise = this.makeRequest(url, {
        ...requestInit,
        signal: abortController.signal,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...requestInit.headers,
        },
      });

      // Store pending request for deduplication
      this.pendingRequests.set(requestKey, {
        promise: requestPromise,
        timestamp: Date.now(),
        abortController,
      });

      // Make the request with retries
      let response = await requestPromise;
      let attempts = 0;

      while (!response.ok && attempts < retryCount) {
        attempts++;
        console.warn(`Request failed (${response.status}), retrying... (${attempts}/${retryCount})`);
        
        // Wait before retry with exponential backoff
        await this.delay(Math.pow(2, attempts) * 1000);
        
        response = await this.makeRequest(url, {
          ...requestInit,
          signal: abortController.signal,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...requestInit.headers,
          },
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await this.parseResponse<T>(response);

      // Cache the response if appropriate
      if (cacheStrategy !== 'realtime' && response.ok) {
        const strategyKey = cacheStrategy.toUpperCase() as keyof typeof CacheStrategies;
        await setCachedData(cacheKey, data, CacheStrategies[strategyKey]);
      }

      return data;
    } catch (error) {
      console.error(`API request failed for ${url}:`, error);
      throw error;
    } finally {
      clearTimeout(timeoutId);
      this.pendingRequests.delete(requestKey);
    }
  }

  /**
   * Make multiple requests in a batch
   */
  async batchRequest(requests: BatchRequest[]): Promise<BatchResponse[]> {
    return new Promise((resolve) => {
      // Add requests to batch queue
      this.batchQueue.push(...requests);

      // Set up batch timer
      if (this.batchTimer) {
        clearTimeout(this.batchTimer);
      }

      this.batchTimer = setTimeout(async () => {
        const batchToProcess = this.batchQueue.splice(0, this.MAX_BATCH_SIZE);
        const results = await this.processBatch(batchToProcess);
        resolve(results);
      }, this.BATCH_DELAY);
    });
  }

  /**
   * Make a GET request
   */
  async get<T = any>(url: string, options: SmartRequestOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  /**
   * Make a POST request
   */
  async post<T = any>(url: string, data?: any, options: SmartRequestOptions = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
    }, { body: data ? JSON.stringify(data) : undefined });
  }

  /**
   * Make a PUT request
   */
  async put<T = any>(url: string, data?: any, options: SmartRequestOptions = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
    }, { body: data ? JSON.stringify(data) : undefined });
  }

  /**
   * Make a DELETE request
   */
  async delete<T = any>(url: string, options: SmartRequestOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }

  /**
   * Cancel all pending requests
   */
  cancelAllRequests(): void {
    for (const [key, pending] of this.pendingRequests) {
      pending.abortController.abort();
    }
    this.pendingRequests.clear();
  }

  /**
   * Get request statistics
   */
  getStats() {
    return {
      pendingRequests: this.pendingRequests.size,
      batchQueueSize: this.batchQueue.length,
      cacheStats: cacheManager.getStats(),
    };
  }

  /**
   * Make the actual HTTP request
   */
  private async makeRequest(url: string, options: RequestInit): Promise<Response> {
    // Add conditional request headers if we have cached data
    const cacheKey = this.getCacheKey(url, options);
    const staleData = cacheManager.getStaleData(cacheKey);
    
    if (staleData) {
      options.headers = {
        ...options.headers,
        'If-None-Match': staleData.etag || '',
        'If-Modified-Since': staleData.lastModified || '',
      };
    }

    return fetch(url, options);
  }

  /**
   * Parse response and handle conditional requests
   */
  private async parseResponse<T>(response: Response): Promise<T> {
    if (response.status === 304) {
      // Not Modified - return stale data
      const url = response.url;
      const cacheKey = this.getCacheKey(url, {});
      const staleData = cacheManager.getStaleData(cacheKey);
      if (staleData) {
        return staleData;
      }
    }

    const data = await response.json();
    
    // Store cache metadata for future conditional requests
    const url = response.url;
    const cacheKey = this.getCacheKey(url, {});
    const etag = response.headers.get('etag');
    const lastModified = response.headers.get('last-modified');
    
    if (etag || lastModified) {
      // Update cache entry with metadata
      const cachedData = await getCachedData(cacheKey, CacheStrategies.API_RESPONSE);
      if (cachedData) {
        await setCachedData(cacheKey, {
          ...cachedData,
          etag: etag || undefined,
          lastModified: lastModified || undefined,
        }, CacheStrategies.API_RESPONSE);
      }
    }

    return data;
  }

  /**
   * Process a batch of requests
   */
  private async processBatch(requests: BatchRequest[]): Promise<BatchResponse[]> {
    const results: BatchResponse[] = [];

    for (const request of requests) {
      try {
        const data = await this.request(request.url, request.options);
        results.push({
          id: request.id,
          data,
          status: 200,
        });
      } catch (error) {
        results.push({
          id: request.id,
          error: error instanceof Error ? error.message : 'Unknown error',
          status: 500,
        });
      }
    }

    return results;
  }

  /**
   * Generate cache key for request
   */
  private getCacheKey(url: string, options: RequestInit): string {
    const method = options.method || 'GET';
    const body = options.body ? JSON.stringify(options.body) : '';
    return `${method}:${url}:${body}`;
  }

  /**
   * Generate request key for deduplication
   */
  private getRequestKey(url: string, options: RequestInit): string {
    const method = options.method || 'GET';
    const body = options.body ? JSON.stringify(options.body) : '';
    return `${method}:${url}:${body}`;
  }

  /**
   * Delay utility for retries
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const smartApiClient = new SmartApiClient();

// Export convenience functions
export const apiGet = <T = any>(url: string, options?: SmartRequestOptions) => 
  smartApiClient.get<T>(url, options);

export const apiPost = <T = any>(url: string, data?: any, options?: SmartRequestOptions) => 
  smartApiClient.post<T>(url, data, options);

export const apiPut = <T = any>(url: string, data?: any, options?: SmartRequestOptions) => 
  smartApiClient.put<T>(url, data, options);

export const apiDelete = <T = any>(url: string, options?: SmartRequestOptions) => 
  smartApiClient.delete<T>(url, options);

export const batchApiRequest = (requests: BatchRequest[]) => 
  smartApiClient.batchRequest(requests);

export const cancelApiRequests = () => 
  smartApiClient.cancelAllRequests();

export const getApiStats = () => 
  smartApiClient.getStats();
