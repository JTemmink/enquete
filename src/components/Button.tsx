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
  const baseClasses = 'py-3 px-6 rounded-lg transition-colors min-h-[48px] flex items-center justify-center';
  const defaultClasses = 'bg-blue-500 text-white hover:bg-blue-600';
  const disabledClasses = 'bg-gray-300 text-gray-500 cursor-not-allowed';
  
  const buttonClasses = disabled 
    ? `${baseClasses} ${disabledClasses} ${className}`
    : `${baseClasses} ${defaultClasses} ${className}`;

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

