import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'webext-redux';
import PopupLayout from './layout';
import { getProxyStore } from '../../store/proxy';
import { RootState } from '../../types/store';
import { Router, Route } from 'wouter';
import PopupRootScreen from './screens/PopupRootScreen';
import SettingsScreen from './screens/SettingsScreen';
import { LoadingState, ConnectionError } from './widgets';
// @ts-ignore - Parcel doesn't resolve wouter/memory-location properly
import { memoryLocation } from 'wouter/esm/memory-location.js';

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
    return <LoadingState />;
  }

  if (!proxyStore) {
    return <ConnectionError />;
  }

  const {hook: locationHook} = memoryLocation({ path: "/" });

  return (
    <Provider store={proxyStore}>
      <PopupLayout>
        <Router hook={locationHook}>
          <Route path="/" component={PopupRootScreen} />
          <Route path="/settings" component={SettingsScreen} />
        </Router>
      </PopupLayout>
    </Provider>
  );
};

export default PopupApp;