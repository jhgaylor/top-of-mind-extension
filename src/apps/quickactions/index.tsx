import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserStateProvider, useBrowserState } from '@/components/providers/BrowserStateProvider';
import './index.css';

interface QuickActionsVisibilityControllerProps {
  children: React.ReactNode;
}

const QuickActionsVisibilityController = ({ children }: QuickActionsVisibilityControllerProps) => {
  const { state } = useBrowserState();
  const { overlayEnabled } = state;

  if (overlayEnabled) {
    return (
      <>
        {children}
      </>
    )
  }

  return null;
}

const QuickActionsAppCommunicator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <BrowserStateProvider channelName="quickactions">
      <QuickActionsVisibilityController>
        <div className="tom-quick-actions-container" style={{ width: '100px', height: '400px' }}>
          <iframe 
            src={chrome.runtime.getURL('src/apps/quickactions/iframe.html')}
            className="tom-iframe"
            style={{ width: '100%', height: '100%', borderRadius: '12px' }}
            title="Quick Actions"
          />
        </div>
      </QuickActionsVisibilityController>
    </BrowserStateProvider>
  );
};

// Create and inject the root element
const rootId = 'com-jakegaylor-extension-quickactions-root';
let containerEl = document.getElementById(rootId);

if (!containerEl) {
  containerEl = document.createElement('div');
  containerEl.id = rootId;
  document.body.appendChild(containerEl);
}

const root = createRoot(containerEl);
root.render(<QuickActionsAppCommunicator />);