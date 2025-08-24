import React from 'react';

interface InputFieldProps {
  type: 'text' | 'email' | 'tel' | 'number';
  name: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  min?: number;
  error?: string;
  className?: string;
}

export default function InputField({
  type,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  min,
  error,
  className = ''
}: InputFieldProps) {
  const baseClasses = 'w-full px-4 py-3 border rounded-lg text-center text-lg';
  const errorClasses = error ? 'border-red-500' : 'border-gray-300';
  const inputClasses = `${baseClasses} ${errorClasses} ${className}`;

  return (
    <div className="w-full">
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        min={min}
        className={inputClasses}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}




