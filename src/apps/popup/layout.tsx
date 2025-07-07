import React, { useEffect } from 'react';

interface PopupLayoutProps {
  children: React.ReactNode;
}

function PopupLayout({ children }: PopupLayoutProps): React.ReactElement {
  return (
    <div className="popup-container">
      <div style={{ padding: '16px', borderBottom: '1px solid #e0e0e0' }}>
        <h3 style={{ margin: '0 0 8px 0' }}>Redux Store Demo - Popup</h3>
        
      </div>
      {children}
    </div>
  );
}

export default PopupLayout;
