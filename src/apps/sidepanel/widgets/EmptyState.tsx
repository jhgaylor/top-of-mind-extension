import React from 'react';

interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  isDarkMode?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  message, 
  icon,
  action,
  isDarkMode = false 
}) => {
  return (
    <div className={`p-8 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} text-center`}>
      {icon && (
        <div className="text-4xl mb-4 opacity-50">
          {icon}
        </div>
      )}
      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {message}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};