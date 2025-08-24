import React, { forwardRef } from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'number' | 'textarea';
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  rows?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  autoComplete?: string;
  'aria-describedby'?: string;
}

const InputField = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputFieldProps>(
  (
    {
      label,
      name,
      type = 'text',
      placeholder,
      value,
      onChange,
      onBlur,
      error,
      required = false,
      disabled = false,
      className = '',
      rows = 3,
      maxLength,
      minLength,
      pattern,
      autoComplete,
      'aria-describedby': ariaDescribedby,
    },
    ref
  ) => {
    const inputId = `${name}-input`;
    const errorId = `${name}-error`;
    const describedBy = [ariaDescribedby, error && errorId].filter(Boolean).join(' ');

    const baseClasses = `
      w-full px-4 py-3 border rounded-xl transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
      disabled:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-60
      ${error 
        ? 'border-error-300 focus:ring-error-500 focus:border-error-500' 
        : 'border-neutral-300 hover:border-neutral-400'
      }
      ${className}
    `;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (onChange) {
        const newValue = type === 'number' ? Number(e.target.value) : e.target.value;
        onChange(newValue);
      }
    };

    if (type === 'textarea') {
      return (
        <div className="space-y-2">
          <label 
            htmlFor={inputId}
            className={`block text-sm font-medium text-neutral-700 ${
              required ? 'after:content-["*"] after:ml-1 after:text-error-500' : ''
            }`}
          >
            {label}
          </label>
          
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={inputId}
            name={name}
            rows={rows}
            placeholder={placeholder}
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            required={required}
            disabled={disabled}
            maxLength={maxLength}
            minLength={minLength}
            autoComplete={autoComplete}
            aria-describedby={describedBy || undefined}
            aria-invalid={error ? 'true' : 'false'}
            className={`${baseClasses} resize-vertical min-h-[80px]`}
          />
          
          {error && (
            <p id={errorId} className="text-sm text-error-600" role="alert">
              {error}
            </p>
          )}
          
          {maxLength && (
            <p className="text-xs text-neutral-500 text-right">
              {String(value || '').length}/{maxLength}
            </p>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <label 
          htmlFor={inputId}
          className={`block text-sm font-medium text-neutral-700 ${
            required ? 'after:content-["*"] after:ml-1 after:text-error-500' : ''
          }`}
        >
          {label}
        </label>
        
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value || ''}
          onChange={handleChange}
          onBlur={onBlur}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          autoComplete={autoComplete}
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? 'true' : 'false'}
          className={baseClasses}
        />
        
        {error && (
          <p id={errorId} className="text-sm text-error-600" role="alert">
            {error}
          </p>
        )}
        
        {maxLength && (
          <p className="text-xs text-neutral-500 text-right">
            {String(value || '').length}/{maxLength}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;




