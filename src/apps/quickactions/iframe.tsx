import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Store } from 'webext-redux';
import { getProxyStore } from '../../store/proxy';
import { RootState } from '../../types/store';
import QuickActionsContainer from './containers/QuickActionsContainer';
import QuickActionsScreen from './screens/QuickActionsScreen';

const QuickActionsFramedApp = () => {
  const [proxyStore, setProxyStore] = useState<Store<RootState> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize the proxy store
    getProxyStore()
      .then((store) => {
        setProxyStore(store);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('[QuickActions] Failed to connect to Redux store:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Connecting to extension store...</div>;
  }

  if (!proxyStore) {
    return <div>Failed to connect to extension store</div>;
  }

  return (
    <Provider store={proxyStore}>
      <QuickActionsContainer>
        <QuickActionsScreen />
      </QuickActionsContainer>
    </Provider>
  );
}

const container = document.getElementById('quickactions-root');
if (container) {
  const root = createRoot(container);
  root.render(<QuickActionsFramedApp />);
}
