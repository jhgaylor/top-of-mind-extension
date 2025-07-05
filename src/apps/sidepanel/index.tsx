import React from 'react';
import { createRoot } from 'react-dom/client';
import SidePanelContainer from './containers/SidePanelContainer';
import SidePanelRootScreen from './screens/SidePanelRootScreen';

const SidePanelApp = () => {
  return (
    <SidePanelContainer>
      <SidePanelRootScreen />
    </SidePanelContainer>
  );
};

const container = document.getElementById('sidepanel-root');
if (container) {
  const root = createRoot(container);
  root.render(<SidePanelApp />);
}
