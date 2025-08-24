import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'skeleton';
  text?: string;
  className?: string;
}

export default function Loading({ 
  size = 'md', 
  variant = 'spinner', 
  text,
  className = '' 
}: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  if (variant === 'dots') {
    return (
      <div className={`flex items-center justify-center space-x-1 ${className}`}>
        <div className={`${sizeClasses[size]} bg-primary-500 rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
        <div className={`${sizeClasses[size]} bg-primary-500 rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
        <div className={`${sizeClasses[size]} bg-primary-500 rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
        {text && <span className={`ml-3 text-neutral-600 ${textSizeClasses[size]}`}>{text}</span>}
      </div>
    );
  }

  if (variant === 'skeleton') {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="bg-neutral-200 rounded-lg h-4 mb-2"></div>
        <div className="bg-neutral-200 rounded-lg h-4 mb-2 w-3/4"></div>
        <div className="bg-neutral-200 rounded-lg h-4 w-1/2"></div>
      </div>
    );
  }

  // Default spinner
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} border-2 border-neutral-200 border-t-primary-500 rounded-full animate-spin`}></div>
      {text && <span className={`mt-3 text-neutral-600 ${textSizeClasses[size]}`}>{text}</span>}
    </div>
  );
}

// Skeleton component voor content loading
export function Skeleton({ className = '', lines = 3 }: { className?: string; lines?: number }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`bg-neutral-200 rounded-lg h-4 animate-pulse ${
            i === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        ></div>
      ))}
    </div>
  );
}
