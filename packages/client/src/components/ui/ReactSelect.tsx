import { forwardRef } from 'react';
import Select, { type Props as SelectProps, type StylesConfig, type GroupBase } from 'react-select';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface ReactSelectProps extends Omit<SelectProps<SelectOption, boolean, GroupBase<SelectOption>>, 'onChange' | 'value'> {
  options: SelectOption[];
  value?: string | number | string[] | number[];
  onChange?: (value: string | number | string[] | number[]) => void;
  placeholder?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  error?: string | boolean;
  helperText?: string;
  className?: string;
}

const getCustomStyles = (
  variant: NonNullable<ReactSelectProps['variant']>,
  size: NonNullable<ReactSelectProps['size']>,
  error?: string | boolean
): StylesConfig<SelectOption, boolean, GroupBase<SelectOption>> => {
  // Padding según tamaño
  const paddingMap = {
    sm: { vertical: '0.375rem', horizontal: '0.75rem' },
    md: { vertical: '0.5rem', horizontal: '0.875rem' },
    lg: { vertical: '0.75rem', horizontal: '1rem' },
  };
  
  const padding = paddingMap[size];
  
  // Colores según variante
  const variantColors = {
    primary: {
      bg: '#ffffff',
      border: '#d1d5db',
      focusBorder: '#6b7280',
      text: '#111827',
    },
    secondary: {
      bg: '#f9fafb',
      border: '#e5e7eb',
      focusBorder: '#6b7280',
      text: '#111827',
    },
    outline: {
      bg: '#ffffff',
      border: '#d1d5db',
      focusBorder: '#6b7280',
      text: '#374151',
    },
    ghost: {
      bg: 'transparent',
      border: 'transparent',
      focusBorder: '#6b7280',
      text: '#374151',
    },
  };

  const colors = variantColors[variant];

  return {
    control: (base, state) => ({
      ...base,
      backgroundColor: colors.bg,
      borderColor: error ? '#ef4444' : state.isFocused ? colors.focusBorder : colors.border,
      borderWidth: '1px',
      borderRadius: '0.5rem',
      padding: `${padding.vertical} ${padding.horizontal}`,
      minHeight: 'auto',
      boxShadow: state.isFocused ? `0 0 0 2px rgba(107, 114, 128, 0.2)` : 'none',
      '&:hover': {
        borderColor: state.isFocused ? colors.focusBorder : colors.border,
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: 0,
    }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
      color: colors.text,
    }),
    placeholder: (base) => ({
      ...base,
      color: '#9ca3af',
    }),
    singleValue: (base) => ({
      ...base,
      color: colors.text,
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '0.5rem',
      marginTop: '0.25rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? '#111827'
        : state.isFocused
        ? '#f3f4f6'
        : 'white',
      color: state.isSelected ? 'white' : '#111827',
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
      '&:active': {
        backgroundColor: state.isSelected ? '#111827' : '#e5e7eb',
      },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: '#f3f4f6',
      borderRadius: '0.25rem',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#111827',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: '#6b7280',
      '&:hover': {
        backgroundColor: '#ef4444',
        color: 'white',
      },
    }),
  };
};

const ReactSelect = forwardRef<any, ReactSelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = 'Seleccionar...',
      variant = 'outline',
      size = 'md',
      error,
      helperText,
      className = '',
      isMulti = false,
      ...props
    },
    ref
  ) => {
    // Convertir el valor a formato react-select
    const getValue = () => {
      if (!value) return isMulti ? [] : null;
      
      if (isMulti) {
        const values = Array.isArray(value) ? value : [value];
        return options.filter(opt => values.includes(opt.value));
      }
      
      return options.find(opt => opt.value === value) || null;
    };

    // Manejar cambios
    const handleChange = (newValue: any) => {
      if (!onChange) return;
      
      if (isMulti) {
        const values = newValue ? newValue.map((opt: SelectOption) => opt.value) : [];
        onChange(values);
      } else {
        onChange(newValue ? newValue.value : '');
      }
    };

    return (
      <div className={className}>
        <Select
          ref={ref}
          options={options}
          value={getValue()}
          onChange={handleChange}
          placeholder={placeholder}
          styles={getCustomStyles(variant, size, error)}
          isMulti={isMulti}
          isOptionDisabled={(option) => option.disabled || false}
          noOptionsMessage={() => 'No hay opciones disponibles'}
          {...props}
        />
        
        {error ? (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {typeof error === 'string' ? error : 'Este campo es requerido'}
          </p>
        ) : helperText ? (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

ReactSelect.displayName = 'ReactSelect';

export default ReactSelect;
