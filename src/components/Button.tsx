import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({ 
  children, 
  onClick, 
  disabled = false, 
  className = '',
  type = 'button',
  variant = 'primary',
  size = 'md'
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[40px]',
    md: 'px-6 py-3 text-base min-h-[48px]',
    lg: 'px-8 py-4 text-lg min-h-[56px]',
  };
  
  const variantClasses = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-medium hover:shadow-large transform hover:-translate-y-0.5',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white shadow-medium hover:shadow-large transform hover:-translate-y-0.5',
    outline: 'bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-50',
    ghost: 'bg-transparent text-neutral-600 hover:bg-neutral-100',
  };
  
  const disabledClasses = 'bg-neutral-300 text-neutral-500 cursor-not-allowed shadow-none transform-none hover:transform-none';
  
  const buttonClasses = disabled 
    ? `${baseClasses} ${sizeClasses[size]} ${disabledClasses} ${className}`
    : `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
}




