"use client";

import { useEffect, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent";
  text?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({ 
  size = "md", 
  color = "primary", 
  text = "Loading...",
  fullScreen = false 
}: LoadingSpinnerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  const colorClasses = {
    primary: "text-emerald-600",
    secondary: "text-purple-600",
    accent: "text-blue-600"
  };

  const containerClasses = fullScreen 
    ? "fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50"
    : "flex items-center justify-center";

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          {/* Main spinner */}
          <Loader2 className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`} />
          
          {/* Sparkle effects */}
          <div className="absolute -top-1 -right-1 w-3 h-3 text-yellow-500 animate-pulse">
            <Sparkles className="w-full h-full" />
          </div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 text-blue-500 animate-pulse animation-delay-1000">
            <Sparkles className="w-full h-full" />
          </div>
          
          {/* Glow effect */}
          <div className={`absolute inset-0 ${colorClasses[color]} opacity-20 blur-lg animate-pulse`} />
        </div>
        
        {text && (
          <p className="text-sm text-muted-foreground animate-fade-in animation-delay-500">
            {text}
          </p>
        )}
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animation-delay-500 {
          animation-delay: 500ms;
        }
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-blue-50 z-50">
      <div className="text-center space-y-8">
        {/* Logo/Icon */}
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl animate-pulse opacity-20" />
          <div className="relative w-full h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl">
            <Sparkles className="w-10 h-10 text-white animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          
          {/* Orbiting particles */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-spin" style={{ animationDuration: '2s' }} />
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400 rounded-full animate-spin" style={{ animationDuration: '2.5s', animationDirection: 'reverse' }} />
        </div>
        
        {/* Loading text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Loading Experience
          </h2>
          <p className="text-muted-foreground">Preparing something amazing...</p>
        </div>
        
        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-200" />
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce animation-delay-400" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonLoader() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 p-6 space-y-4 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
      <div className="h-4 bg-gray-200 rounded w-4/5" />
      <div className="h-10 bg-gray-200 rounded w-1/4" />
    </div>
  );
}
