import React from 'react';
import { createRoot } from 'react-dom/client';
import SidePanelApp from './app';
import './index.css';

const container = document.getElementById('sidepanel-root');
if (container) {
  const root = createRoot(container);
  root.render(<SidePanelApp />);
  const port = chrome.runtime.connect({ name: 'sidepanel' });
  port.onMessage.addListener((message) => {
    console.log('[Sidepanel] Message received:', message);
  });
  port.postMessage({
    type: 'state:sync',
  });
}
