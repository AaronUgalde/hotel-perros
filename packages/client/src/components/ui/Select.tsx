import React, { forwardRef } from 'react';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  id?: string;
  name?: string;
  options: SelectOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  placeholder?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  helperText?: string;
  error?: string | boolean;
}

const baseClasses =
  'w-full rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 appearance-none';

const variantClasses: Record<NonNullable<SelectProps['variant']>, string> = {
  primary: 'bg-white border border-gray-300 text-gray-900 focus:ring-gray-500',
  secondary: 'bg-gray-50 border border-gray-200 text-gray-900 focus:ring-gray-500',
  outline: 'bg-white border border-gray-300 text-gray-700 focus:ring-gray-500',
  ghost: 'bg-transparent border border-transparent text-gray-700 focus:ring-gray-500',
};

const sizeClasses: Record<NonNullable<SelectProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-3.5 py-2 text-sm',
  lg: 'px-4 py-3 text-base',
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      name,
      options,
      value,
      onChange,
      multiple = false,
      placeholder,
      variant = 'outline',
      size = 'md',
      disabled = false,
      className = '',
      helperText,
      error,
    },
    ref
  ) => {
    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    } ${className}`;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (multiple) {
        const values = Array.from(e.target.selectedOptions).map((o) => o.value);
        onChange && onChange(values);
      } else {
        onChange && onChange((e.target.value as string) || '');
      }
    };

    return (
      <div>
        <div className="relative">
          <select
            id={id}
            name={name}
            ref={ref}
            value={value as any}
            onChange={handleChange}
            multiple={multiple}
            disabled={disabled}
            className={classes}
            aria-invalid={!!error}
          >
            {!multiple && placeholder ? (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            ) : null}

            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* optional chevron icon */}
          {!multiple && (
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        {error ? (
          <p className="mt-1 text-sm text-red-600" role="alert">{typeof error === 'string' ? error : 'Este campo es requerido'}</p>
        ) : helperText ? (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
