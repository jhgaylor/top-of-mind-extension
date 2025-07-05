import React from 'react';

interface SidePanelContainerProps {
  children: React.ReactNode;
}

function SidePanelContainer({ children }: SidePanelContainerProps): React.ReactElement {
  return (
    <div>
      {children}
    </div>
  );
}

export default SidePanelContainer;
