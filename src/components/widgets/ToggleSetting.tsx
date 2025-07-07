import React from 'react';
import { Toggle } from '@/components/atoms/Toggle';

interface ToggleSettingProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
}

export const ToggleSetting: React.FC<ToggleSettingProps> = ({ 
  enabled, 
  onChange, 
  label, 
  description,
  disabled = false
}) => {
  const handleLabelClick = () => {
    if (!disabled) {
      onChange(!enabled);
    }
  };

  return (
    <div className="flex items-start justify-between py-4">
      <div className="flex-1 pr-3">
        <label 
          className={`text-sm font-medium text-gray-900 ${disabled ? 'opacity-50' : 'cursor-pointer'}`} 
          onClick={handleLabelClick}
        >
          {label}
        </label>
        {description && (
          <p className={`mt-1 text-xs text-gray-500 ${disabled ? 'opacity-50' : ''}`}>
            {description}
          </p>
        )}
      </div>
      <Toggle
        checked={enabled}
        onChange={onChange}
        disabled={disabled}
        aria-label={label}
      />
    </div>
  );
};