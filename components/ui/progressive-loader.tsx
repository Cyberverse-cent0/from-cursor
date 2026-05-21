"use client";

import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { cn } from '@/lib/utils';

export interface ProgressiveLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  delay?: number;
  priority?: 'high' | 'medium' | 'low';
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

/**
 * Progressive loader component that defers loading of non-critical content
 */
export function ProgressiveLoader({
  children,
  fallback,
  delay = 0,
  priority = 'medium',
  className,
  threshold = 0.1,
  rootMargin = '50px',
}: ProgressiveLoaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority === 'high');
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // High priority content loads immediately
    if (priority === 'high') {
      setIsVisible(true);
      return;
    }

    // Medium priority loads after short delay
    if (priority === 'medium' && delay === 0) {
      const timer = setTimeout(() => {
        setShouldLoad(true);
      }, 100);
      return () => clearTimeout(timer);
    }

    // Low priority or delayed content uses Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Add delay if specified
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              setShouldLoad(true);
            }, delay);
          } else {
            setIsVisible(true);
            setShouldLoad(true);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [priority, delay, threshold, rootMargin]);

  // Default fallback based on priority
  const defaultFallback = (
    <div className={cn("animate-pulse", className)}>
      <div className="bg-gray-200 rounded-lg h-32 w-full" />
    </div>
  );

  return (
    <div ref={elementRef} className={className}>
      {shouldLoad ? (
        <Suspense fallback={fallback || defaultFallback}>
          {children}
        </Suspense>
      ) : (
        fallback || defaultFallback
      )}
    </div>
  );
}

export interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  priority?: 'high' | 'medium' | 'low';
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Lazy loading image component with progressive enhancement
 */
export function LazyImage({
  src,
  alt,
  className,
  fallback = '/images/placeholder.jpg',
  priority = 'medium',
  onLoad,
  onError,
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState(fallback);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority === 'high') {
      loadImage();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadImage();
        }
      },
      { threshold: 0.1 }
    );

    const img = imgRef.current;
    if (img) {
      observer.observe(img);
    }

    return () => {
      if (img) {
        observer.unobserve(img);
      }
    };
  }, [priority]);

  const loadImage = () => {
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
      onLoad?.();
    };
    
    img.onerror = () => {
      setError(true);
      setIsLoading(false);
      onError?.();
    };
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      {error && (
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Failed to load</span>
        </div>
      )}
    </div>
  );
}

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

/**
 * Skeleton loading component for various content types
 */
export function Skeleton({
  className,
  variant = 'text',
  width,
  height,
  lines = 1,
}: SkeletonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'rectangular':
        return 'rounded-none';
      case 'rounded':
        return 'rounded-lg';
      case 'text':
      default:
        return 'rounded';
    }
  };

  const style: React.CSSProperties = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? '1rem' : undefined),
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "bg-gray-200 animate-pulse rounded",
              index === lines - 1 ? 'w-3/4' : 'w-full'
            )}
            style={{ height: height || '1rem' }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-gray-200 animate-pulse",
        getVariantClasses(),
        className
      )}
      style={style}
    />
  );
}

export interface ContentChunkProps {
  children: React.ReactNode;
  priority: 'critical' | 'important' | 'secondary';
  fallback?: React.ReactNode;
  delay?: number;
}

/**
 * Content chunk component for organizing content by priority
 */
export function ContentChunk({
  children,
  priority,
  fallback,
  delay,
}: ContentChunkProps) {
  const getDelay = () => {
    if (delay) return delay;
    switch (priority) {
      case 'critical':
        return 0;
      case 'important':
        return 200;
      case 'secondary':
        return 500;
      default:
        return 0;
    }
  };

  const getPriority = (): 'high' | 'medium' | 'low' => {
    switch (priority) {
      case 'critical':
        return 'high';
      case 'important':
        return 'medium';
      case 'secondary':
        return 'low';
      default:
        return 'medium';
    }
  };

  return (
    <ProgressiveLoader
      priority={getPriority()}
      delay={getDelay()}
      fallback={fallback}
    >
      {children}
    </ProgressiveLoader>
  );
}

/**
 * Higher-order component for lazy loading React components
 */
export function lazyLoad<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ReactNode,
  priority: 'high' | 'medium' | 'low' = 'medium'
) {
  const LazyComponent = lazy(importFunc);

  return function LazyWrapper(props: React.ComponentProps<T>) {
    return (
      <ProgressiveLoader
        priority={priority}
        fallback={fallback}
      >
        <LazyComponent {...props} />
      </ProgressiveLoader>
    );
  };
}

/**
 * Hook for progressive loading data
 */
export function useProgressiveData<T>(
  fetcher: () => Promise<T>,
  options: {
    priority?: 'high' | 'medium' | 'low';
    delay?: number;
    deps?: React.DependencyList;
  } = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { priority = 'medium', delay = 0, deps = [] } = options;

  useEffect(() => {
    if (priority === 'high') {
      loadData();
      return;
    }

    const timer = setTimeout(() => {
      loadData();
    }, delay);

    return () => clearTimeout(timer);
  }, deps);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch: loadData };
}
