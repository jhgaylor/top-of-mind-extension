import React from 'react';
import { createRoot } from 'react-dom/client';
import PopupApp from './app';
import './index.css';

// Establish named connection for presence tracking
chrome.runtime.connect({ name: 'popup' });

const container = document.getElementById('popup-root');
if (container) {
  const root = createRoot(container);
  root.render(<PopupApp />);
}
