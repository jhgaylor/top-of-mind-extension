import React from 'react';
import { createRoot } from 'react-dom/client';

const QuickActionsFramedApp = () => {
  return (
    <div>
      <h1>Quick Actions</h1>
    </div>
  );
}

const container = document.getElementById('quickactions-root');
if (container) {
  const root = createRoot(container);
  root.render(<QuickActionsFramedApp />);
}
