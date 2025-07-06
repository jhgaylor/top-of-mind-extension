import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Store } from 'webext-redux';
import PopupContainer from './containers/PopupContainer';
import PopupRootScreen from './screens/PopupRootScreen';
import { getProxyStore } from '../../store/proxy';
import { RootState } from '../../types/store';

const PopupApp = () => {
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
        console.error('[Popup] Failed to connect to Redux store:', error);
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
      <PopupContainer>
        <PopupRootScreen />
      </PopupContainer>
    </Provider>
  );
};

const container = document.getElementById('popup-root');
if (container) {
  const root = createRoot(container);
  root.render(<PopupApp />);
}
