import React from 'react';
import { createRoot } from 'react-dom/client';
import PopupContainer from './containers/PopupContainer';
import PopupRootScreen from './screens/PopupRootScreen';

const PopupApp = () => {
  return (
    <PopupContainer>
      <PopupRootScreen />
    </PopupContainer>
  );
};

const container = document.getElementById('popup-root');
if (container) {
  const root = createRoot(container);
  root.render(<PopupApp />);
}
