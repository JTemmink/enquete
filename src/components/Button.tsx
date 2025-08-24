import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function Button({ 
  children, 
  onClick, 
  disabled = false, 
  className = '',
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left'
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[40px] gap-2',
    md: 'px-6 py-3 text-base min-h-[48px] gap-3',
    lg: 'px-8 py-4 text-lg min-h-[56px] gap-3',
  };
  
  const variantClasses = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-medium hover:shadow-large transform hover:-translate-y-0.5 focus:ring-primary-500 active:scale-95',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white shadow-medium hover:shadow-large transform hover:-translate-y-0.5 focus:ring-secondary-500 active:scale-95',
    outline: 'bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-50 hover:border-primary-600 focus:ring-primary-500 active:scale-95',
    ghost: 'bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus:ring-neutral-500 active:scale-95',
  };
  
  const disabledClasses = 'bg-neutral-300 text-neutral-500 cursor-not-allowed shadow-none transform-none hover:transform-none hover:shadow-none';
  
  const buttonClasses = disabled 
    ? `${baseClasses} ${sizeClasses[size]} ${disabledClasses} ${className}`
    : `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const renderIcon = () => {
    if (!icon) return null;
    
    return (
      <span className={`inline-flex items-center ${loading ? 'animate-spin' : ''}`}>
        {icon}
      </span>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Laden...
        </>
      );
    }

    if (icon && iconPosition === 'left') {
      return (
        <>
          {renderIcon()}
          {children}
        </>
      );
    }

    if (icon && iconPosition === 'right') {
      return (
        <>
          {children}
          {renderIcon()}
        </>
      );
    }

    return children;
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
    >
      {renderContent()}
    </button>
  );
}




