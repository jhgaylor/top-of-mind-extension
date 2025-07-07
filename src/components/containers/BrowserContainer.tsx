import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'webext-redux';
import { getProxyStore } from '@/store/proxy';
import { RootState } from '@/types/store';
import { LoadingState, ConnectionError } from '@/components/widgets';

interface BrowserContainerProps {
  children: React.ReactNode;
}

function BrowserContainer({ children }: BrowserContainerProps): React.ReactElement {
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
        console.error('[SidePanel] Failed to connect to Redux store:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingState message="Connecting to extension..." />;
  }

  if (!proxyStore) {
    return <ConnectionError />;
  }

  return (
    <Provider store={proxyStore}>
      {children}
    </Provider>
  );
}

export default BrowserContainer;
