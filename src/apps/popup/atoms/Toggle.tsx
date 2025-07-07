import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  'aria-label'?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ 
  checked, 
  onChange, 
  disabled = false,
  size = 'md',
  className = '',
  'aria-label': ariaLabel
}) => {
  const sizeClasses = {
    sm: {
      switch: 'h-5 w-9',
      handle: 'h-4 w-4',
      translate: 'translate-x-4'
    },
    md: {
      switch: 'h-6 w-11',
      handle: 'h-5 w-5',
      translate: 'translate-x-5'
    },
    lg: {
      switch: 'h-7 w-14',
      handle: 'h-6 w-6',
      translate: 'translate-x-7'
    }
  };

  const sizes = sizeClasses[size];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`
        relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
        ${sizes.switch}
        ${checked ? 'bg-blue-600' : 'bg-gray-200'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      <span
        className={`
          inline-block transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out
          ${sizes.handle}
          ${checked ? sizes.translate : 'translate-x-0'}
        `}
      />
    </button>
  );
};