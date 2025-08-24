import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ 
  children, 
  onClick, 
  disabled = false, 
  className = '', 
  type = 'button'
}: ButtonProps) {
  const baseClasses = 'py-4 px-8 rounded-full transition-all duration-300 min-h-[56px] flex items-center justify-center font-medium text-lg shadow-lg transform hover:scale-105 active:scale-95';
  const defaultClasses = 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white hover:from-amber-700 hover:via-amber-600 hover:to-amber-700 hover:shadow-xl';
  const disabledClasses = 'bg-gray-300 text-gray-500 cursor-not-allowed hover:scale-100 shadow-none';
  
  const buttonClasses = disabled 
    ? `${baseClasses} ${disabledClasses} ${className}`
    : `${baseClasses} ${defaultClasses} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      style={{
        backgroundImage: disabled ? undefined : 'linear-gradient(45deg, #d97706, #f59e0b, #d97706)',
        border: '3px solid #92400e',
        boxShadow: disabled ? 'none' : '0 8px 25px rgba(217, 119, 6, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      }}
    >
      <div className="relative">
        {/* Stokbrood textuur effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30 rounded-full"></div>
        {children}
      </div>
    </button>
  );
}




