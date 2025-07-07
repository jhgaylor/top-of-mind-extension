import React, { createContext, useContext, useEffect, useState } from 'react';
import { LoadingState } from '@/components/widgets';

interface BrowserStateProviderProps {
  channelName: string;
  children: React.ReactNode;
}

interface BrowserStateContextType {
  state: {
    present: string[];
  };
}

const BrowserStateContext = createContext<BrowserStateContextType>({
  state: {
    present: []
  }
});

export function BrowserStateProvider({ channelName, children }: BrowserStateProviderProps): React.ReactElement {
  const [isLoading, setIsLoading] = useState(true);
  const [port, setPort] = useState<chrome.runtime.Port | null>(null);
  const [state, setState] = useState({
    present: [],
  });

  useEffect(() => {
    if (port) {
      port.disconnect();
    }
    const newPort = chrome.runtime.connect({ name: channelName });
    newPort.onMessage.addListener((message) => {
      console.log(`[${channelName}] Message received:`, message);
      setState((prevState) => ({
        ...prevState,
        ...message.data,
      }));
    });
    newPort.postMessage({
      type: 'state:sync',
    });
    setPort(newPort);
    setIsLoading(false);
    return () => {
      newPort.disconnect();
    };
  }, [channelName]);

  if (isLoading) {
    return <LoadingState message="Connecting to extension..." />;
  }

  const value = {
    state: {
      ...state,
    },
  }

  return (
    <BrowserStateContext.Provider value={value}>
      {children}
    </BrowserStateContext.Provider>
  );
}

export function useBrowserState() {
  const context = useContext(BrowserStateContext);
  if (!context) {
    throw new Error('useBrowserState must be used within a BrowserState');
  }
  return context;
}
