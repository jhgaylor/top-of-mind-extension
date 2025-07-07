import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'webext-redux';
import PopupContainer from './containers/PopupContainer';
import PopupLayout from './layout';
import { getProxyStore } from '../../store/proxy';
import { RootState } from '../../types/store';
import { Router, Route, Link } from 'wouter';
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
    return <div>Connecting to extension store...</div>;
  }

  if (!proxyStore) {
    return <div>Failed to connect to extension store</div>;
  }

  const {hook: locationHook} = memoryLocation({ path: "/" });

  return (
    <Provider store={proxyStore}>
      <PopupLayout>
        <Router hook={locationHook}>
          <Route path="/">
            <p>Hello</p>
            <Link to="/settings">Settings</Link>
          </Route>
          <Route path="/settings">
            <p>Settings</p>
            <Link to="/">Home</Link>
          </Route>
        </Router>
      </PopupLayout>
    </Provider>
  );
};

export default PopupApp;