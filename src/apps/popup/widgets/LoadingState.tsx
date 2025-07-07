import React from 'react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = "Connecting to extension..." 
}) => {
  return (
    <div className="popup-container bg-white flex items-center justify-center">
      <div className="text-center p-8">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  );
};