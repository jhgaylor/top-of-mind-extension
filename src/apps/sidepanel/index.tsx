import React from 'react';
import { createRoot } from 'react-dom/client';
import SidePanelApp from './app';
import './index.css';

// Establish named connection for presence tracking
chrome.runtime.connect({ name: 'sidepanel' });

const container = document.getElementById('sidepanel-root');
if (container) {
  const root = createRoot(container);
  root.render(<SidePanelApp />);
}
