import React from 'react';
import { createRoot } from 'react-dom/client';

const QuickActionsAppCommunicator = () => {
  return (
    <div>
      <iframe 
        src={chrome.runtime.getURL('src/apps/quickactions/iframe.html')}
        className="quick-actions-iframe"
        title="Quick Actions"
      />
    </div>
  );
};

const rootId = 'com-jakegaylor-extension-quickactions-root';
const containerEl = document.createElement('div');
containerEl.id = rootId;

document.getElementById(rootId)?.remove();
document.body.appendChild(containerEl);

const root = createRoot(containerEl);
root.render(<QuickActionsAppCommunicator />);
