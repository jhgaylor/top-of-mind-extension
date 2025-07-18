import React from 'react';

interface QuickActionsContainerProps {
  children: React.ReactNode;
}

function QuickActionsContainer({ children }: QuickActionsContainerProps): React.ReactElement {

  return (
    <div className="quickactions-app">
      {children}
    </div>
  );
}

export default QuickActionsContainer;