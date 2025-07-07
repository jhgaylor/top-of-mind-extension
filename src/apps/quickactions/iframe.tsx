import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserStateProvider } from '@/components/providers/BrowserStateProvider';
import QuickActionsContainer from './containers/QuickActionsContainer';
import QuickActionsScreen from './screens/QuickActionsScreen';

const QuickActionsFramedApp = () => {
  return (
    <BrowserStateProvider channelName="quickactions">
      <QuickActionsContainer>
        <QuickActionsScreen />
      </QuickActionsContainer>
    </BrowserStateProvider>
  );
}

const container = document.getElementById('quickactions-root');
if (container) {
  const root = createRoot(container);
  root.render(<QuickActionsFramedApp />);
}