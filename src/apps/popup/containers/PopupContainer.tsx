import React from 'react';

interface PopupContainerProps {
  children: React.ReactNode;
}

function PopupContainer({ children }: PopupContainerProps): React.ReactElement {
  return (
    <div>
      {children}
    </div>
  );
}

export default PopupContainer;
