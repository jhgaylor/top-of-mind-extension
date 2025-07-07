import React from 'react';

interface ConnectionErrorProps {
  title?: string;
  message?: string;
  icon?: string;
}

export const ConnectionError: React.FC<ConnectionErrorProps> = ({ 
  title = "Connection Failed",
  message = "Please reload the extension",
  icon = "⚠️"
}) => {
  return (
    <div className="popup-container bg-white flex items-center justify-center">
      <div className="text-center p-8">
        <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl">{icon}</span>
        </div>
        <p className="text-sm text-gray-800 font-medium">{title}</p>
        <p className="text-xs text-gray-600 mt-2">{message}</p>
      </div>
    </div>
  );
};