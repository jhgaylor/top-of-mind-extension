import React from 'react';
import { createRoot } from 'react-dom/client';
import PopupApp from './app';

const container = document.getElementById('popup-root');
if (container) {
  const root = createRoot(container);
  root.render(<PopupApp />);
}
