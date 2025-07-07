import React, { useEffect } from 'react';

interface PopupLayoutProps {
  children: React.ReactNode;
}

function PopupLayout({ children }: PopupLayoutProps): React.ReactElement {
  return (
    <div className="popup-container bg-white">
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
        <h1 className="text-lg font-semibold text-white">Top of Mind</h1>
        <p className="text-xs text-blue-100 mt-1">Extension Settings</p>
      </header>
      <main className="p-4">
        {children}
      </main>
    </div>
  );
}

export default PopupLayout;
