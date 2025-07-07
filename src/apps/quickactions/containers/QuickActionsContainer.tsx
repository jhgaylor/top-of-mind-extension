import React from 'react';

interface QuickActionsContainerProps {
  children: React.ReactNode;
}

function QuickActionsContainer({ children }: QuickActionsContainerProps): React.ReactElement {

  return (
    <div className="quickactions-app min-h-full bg-white dark:bg-gray-900">
      {children}
    </div>
  );
}

export default QuickActionsContainer;