/**
 * Performance monitoring system for tracking application metrics
 * Monitors cache performance, API response times, and user experience metrics
 */

export interface PerformanceMetrics {
  pageLoadTime: number;
  apiResponseTime: number;
  cacheHitRate: number;
  errorRate: number;
  memoryUsage: number;
  networkRequests: number;
  timestamp: number;
}

export interface CacheMetrics {
  hits: number;
  misses: number;
  size: number;
  hitRate: number;
  totalRequests: number;
}

export interface ApiMetrics {
  endpoint: string;
  method: string;
  responseTime: number;
  status: number;
  cached: boolean;
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private apiMetrics: ApiMetrics[] = [];
  private cacheMetrics: CacheMetrics | null = null;
  private observers: PerformanceObserver[] = [];
  private startTime: number = Date.now();
  
  constructor() {
    this.initializeObservers();
    this.trackPageLoad();
  }

  /**
   * Initialize performance observers
   */
  private initializeObservers(): void {
    if (typeof window === 'undefined') return;

    // Observer for navigation timing
    try {
      const navObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            this.recordPageLoadMetrics(navEntry);
          }
        });
      });
      navObserver.observe({ entryTypes: ['navigation'] });
      this.observers.push(navObserver);
    } catch (error) {
      console.warn('Navigation observer not supported:', error);
    }

    // Observer for resource timing
    try {
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'resource') {
            this.recordResourceMetrics(entry as PerformanceResourceTiming);
          }
        });
      });
      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.push(resourceObserver);
    } catch (error) {
      console.warn('Resource observer not supported:', error);
    }
  }

  /**
   * Track page load metrics
   */
  private trackPageLoad(): void {
    if (typeof window === 'undefined') return;

    if (document.readyState === 'complete') {
      this.recordPageLoadMetrics();
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => this.recordPageLoadMetrics(), 0);
      });
    }
  }

  /**
   * Record page load metrics
   */
  private recordPageLoadMetrics(navEntry?: PerformanceNavigationTiming): void {
    if (typeof window === 'undefined') return;

    try {
      const timing = navEntry || window.performance.timing;
      const navigation = navEntry || (window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming);

      // Handle both old and new timing APIs
      let loadTime: number;
      let domContentLoaded: number;
      
      if (navEntry) {
        loadTime = navEntry.loadEventEnd - navEntry.fetchStart;
        domContentLoaded = navEntry.domContentLoadedEventEnd - navEntry.fetchStart;
      } else {
        // Use type assertion for legacy timing API
        const legacyTiming = timing as any;
        loadTime = legacyTiming.loadEventEnd - legacyTiming.navigationStart;
        domContentLoaded = legacyTiming.domContentLoadedEventEnd - legacyTiming.navigationStart;
      }
      
      const firstPaint = this.getFirstPaint();
      const firstContentfulPaint = this.getFirstContentfulPaint();

      const metrics: PerformanceMetrics = {
        pageLoadTime: loadTime,
        apiResponseTime: 0, // Will be updated by API calls
        cacheHitRate: 0, // Will be updated by cache system
        errorRate: 0, // Will be updated by error tracking
        memoryUsage: this.getMemoryUsage(),
        networkRequests: this.getNetworkRequestCount(),
        timestamp: Date.now(),
      };

      this.metrics.push(metrics);
      console.log('Page load metrics recorded:', metrics);
    } catch (error) {
      console.warn('Error recording page load metrics:', error);
    }
  }

  /**
   * Record resource metrics
   */
  private recordResourceMetrics(entry: PerformanceResourceTiming): void {
    // Track API calls specifically
    if (entry.name.includes('/api/')) {
      const apiMetric: ApiMetrics = {
        endpoint: entry.name,
        method: 'GET', // Could be extracted from request if needed
        responseTime: entry.responseEnd - entry.requestStart,
        status: 200, // Would need to be tracked separately
        cached: entry.transferSize === 0 && entry.decodedBodySize > 0,
        timestamp: Date.now(),
      };
      this.apiMetrics.push(apiMetric);
    }
  }

  /**
   * Record API call metrics
   */
  recordApiCall(endpoint: string, method: string, responseTime: number, status: number, cached: boolean): void {
    const metric: ApiMetrics = {
      endpoint,
      method,
      responseTime,
      status,
      cached,
      timestamp: Date.now(),
    };

    this.apiMetrics.push(metric);
    this.updateOverallMetrics();
  }

  /**
   * Update cache metrics
   */
  updateCacheMetrics(metrics: CacheMetrics): void {
    this.cacheMetrics = metrics;
    this.updateOverallMetrics();
  }

  /**
   * Update overall metrics with latest data
   */
  private updateOverallMetrics(): void {
    if (this.metrics.length === 0) return;

    const latest = this.metrics[this.metrics.length - 1];
    
    // Update API response time (average of recent calls)
    const recentApiCalls = this.apiMetrics.slice(-10);
    if (recentApiCalls.length > 0) {
      latest.apiResponseTime = recentApiCalls.reduce((sum, call) => sum + call.responseTime, 0) / recentApiCalls.length;
    }

    // Update cache hit rate
    if (this.cacheMetrics) {
      latest.cacheHitRate = this.cacheMetrics.hitRate;
    }

    // Update error rate
    const recentApiCallsWithError = recentApiCalls.filter(call => call.status >= 400);
    latest.errorRate = recentApiCalls.length > 0 ? recentApiCallsWithError.length / recentApiCalls.length : 0;
  }

  /**
   * Get first paint time
   */
  private getFirstPaint(): number {
    if (typeof window === 'undefined') return 0;

    try {
      const paintEntries = performance.getEntriesByType('paint');
      const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
      return firstPaint ? firstPaint.startTime : 0;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Get first contentful paint time
   */
  private getFirstContentfulPaint(): number {
    if (typeof window === 'undefined') return 0;

    try {
      const paintEntries = performance.getEntriesByType('paint');
      const firstContentfulPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      return firstContentfulPaint ? firstContentfulPaint.startTime : 0;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Get memory usage
   */
  private getMemoryUsage(): number {
    if (typeof window === 'undefined') return 0;

    try {
      if ('memory' in performance) {
        return (performance as any).memory.usedJSHeapSize;
      }
    } catch (error) {
      // Ignore
    }
    return 0;
  }

  /**
   * Get network request count
   */
  private getNetworkRequestCount(): number {
    if (typeof window === 'undefined') return 0;

    try {
      return performance.getEntriesByType('resource').length;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Get current performance metrics
   */
  getCurrentMetrics(): PerformanceMetrics | null {
    return this.metrics.length > 0 ? this.metrics[this.metrics.length - 1] : null;
  }

  /**
   * Get all performance metrics
   */
  getAllMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  /**
   * Get API metrics
   */
  getApiMetrics(): ApiMetrics[] {
    return [...this.apiMetrics];
  }

  /**
   * Get cache metrics
   */
  getCacheMetrics(): CacheMetrics | null {
    return this.cacheMetrics;
  }

  /**
   * Get performance summary
   */
  getPerformanceSummary(): {
    pageLoadTime: number;
    apiResponseTime: number;
    cacheHitRate: number;
    errorRate: number;
    totalApiCalls: number;
    cacheHits: number;
    cacheMisses: number;
  } {
    const latest = this.getCurrentMetrics();
    if (!latest) {
      return {
        pageLoadTime: 0,
        apiResponseTime: 0,
        cacheHitRate: 0,
        errorRate: 0,
        totalApiCalls: 0,
        cacheHits: 0,
        cacheMisses: 0,
      };
    }

    return {
      pageLoadTime: latest.pageLoadTime,
      apiResponseTime: latest.apiResponseTime,
      cacheHitRate: latest.cacheHitRate,
      errorRate: latest.errorRate,
      totalApiCalls: this.apiMetrics.length,
      cacheHits: this.cacheMetrics?.hits || 0,
      cacheMisses: this.cacheMetrics?.misses || 0,
    };
  }

  /**
   * Get Core Web Vitals
   */
  getCoreWebVitals(): {
    lcp: number; // Largest Contentful Paint
    fid: number; // First Input Delay
    cls: number; // Cumulative Layout Shift
  } {
    if (typeof window === 'undefined') {
      return { lcp: 0, fid: 0, cls: 0 };
    }

    try {
      const vitals = {
        lcp: this.getLCP(),
        fid: this.getFID(),
        cls: this.getCLS(),
      };
      return vitals;
    } catch (error) {
      console.warn('Error getting Core Web Vitals:', error);
      return { lcp: 0, fid: 0, cls: 0 };
    }
  }

  /**
   * Get Largest Contentful Paint (LCP)
   */
  private getLCP(): number {
    try {
      const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
      return lcpEntries.length > 0 ? lcpEntries[lcpEntries.length - 1].startTime : 0;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Get First Input Delay (FID)
   */
  private getFID(): number {
    try {
      const fidEntries = performance.getEntriesByType('first-input');
      if (fidEntries.length > 0) {
        const fidEntry = fidEntries[0] as any;
        return fidEntry.processingStart - fidEntry.startTime;
      }
      return 0;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Get Cumulative Layout Shift (CLS)
   */
  private getCLS(): number {
    try {
      let clsValue = 0;
      const clsEntries = performance.getEntriesByType('layout-shift');
      clsEntries.forEach((entry) => {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      });
      return clsValue;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Start measuring an operation
   */
  startMeasure(name: string): () => number {
    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      console.log(`${name} took ${duration.toFixed(2)}ms`);
      return duration;
    };
  }

  /**
   * Clear all metrics
   */
  clearMetrics(): void {
    this.metrics = [];
    this.apiMetrics = [];
    this.cacheMetrics = null;
    this.startTime = Date.now();
  }

  /**
   * Export metrics for analysis
   */
  exportMetrics(): string {
    const exportData = {
      timestamp: new Date().toISOString(),
      summary: this.getPerformanceSummary(),
      coreWebVitals: this.getCoreWebVitals(),
      metrics: this.metrics,
      apiMetrics: this.apiMetrics,
      cacheMetrics: this.cacheMetrics,
      uptime: Date.now() - this.startTime,
    };

    return JSON.stringify(exportData, null, 2);
  }

  /**
   * Cleanup observers
   */
  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Export convenience functions
export const recordApiCall = (endpoint: string, method: string, responseTime: number, status: number, cached: boolean) => {
  performanceMonitor.recordApiCall(endpoint, method, responseTime, status, cached);
};

export const updateCacheMetrics = (metrics: CacheMetrics) => {
  performanceMonitor.updateCacheMetrics(metrics);
};

export const getPerformanceSummary = () => {
  return performanceMonitor.getPerformanceSummary();
};

export const getCoreWebVitals = () => {
  return performanceMonitor.getCoreWebVitals();
};

export const startMeasure = (name: string) => {
  return performanceMonitor.startMeasure(name);
};
