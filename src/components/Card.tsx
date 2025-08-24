import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'soft' | 'medium' | 'large';
  border?: boolean;
  hover?: boolean;
}

export default function Card({ 
  children, 
  className = '',
  padding = 'md',
  shadow = 'soft',
  border = true,
  hover = false
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const shadowClasses = {
    none: '',
    soft: 'shadow-soft',
    medium: 'shadow-medium',
    large: 'shadow-large',
  };

  const baseClasses = `
    bg-white rounded-2xl transition-all duration-200
    ${border ? 'border border-neutral-100' : ''}
    ${paddingClasses[padding]}
    ${shadowClasses[shadow]}
    ${hover ? 'hover:shadow-large hover:-translate-y-1' : ''}
    ${className}
  `;

  return (
    <div className={baseClasses}>
      {children}
    </div>
  );
}

// Card sub-components voor betere structuur
Card.Header = function CardHeader({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <div className={`mb-6 ${className}`}>
      {children}
    </div>
  );
};

Card.Content = function CardContent({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <div className={`mt-6 pt-6 border-t border-neutral-100 ${className}`}>
      {children}
    </div>
  );
};
