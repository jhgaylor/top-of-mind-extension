import React, { createContext, useContext, useEffect, useState } from 'react';
import { LoadingState } from '@/components/widgets';

interface BrowserStateProviderProps {
  channelName: string;
  children: React.ReactNode;
}

interface BrowserStateContextType {
  state: {
    present: string[];
    notificationsEnabled: boolean;
    overlayEnabled: boolean;
    theme: 'light' | 'dark' | 'system';
  }
  setNotificationsEnabled: (enabled: boolean) => void;
  setOverlayEnabled: (enabled: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  sendMessage: (message: any) => void;
}

const BrowserStateContext = createContext<BrowserStateContextType>({
  state: {
    present: [],
    notificationsEnabled: false,
    overlayEnabled: false,
    theme: 'system',
  },
  setNotificationsEnabled: () => {},
  setOverlayEnabled: () => {},
  setTheme: () => {},
  sendMessage: () => {},
});

export function BrowserStateProvider({ channelName, children }: BrowserStateProviderProps): React.ReactElement {
  const [isLoading, setIsLoading] = useState(true);
  const [port, setPort] = useState<chrome.runtime.Port | null>(null);
  const [lastDisconnectedAt, setLastDisconnectedAt] = useState<number | null>(null);
  const [state, setState] = useState({
    present: [],
    notificationsEnabled: false,
    overlayEnabled: false,
    theme: 'system' as 'light' | 'dark' | 'system',
  });

  useEffect(() => {
    const newPort = chrome.runtime.connect({ name: channelName });
    newPort.onMessage.addListener((message) => {
      console.log(`[${channelName}] Message received:`, message);
      setState((prevState) => ({
        ...prevState,
        ...message.data,
      }));
    });
    newPort.onDisconnect.addListener(() => {
      setPort(null);
      setLastDisconnectedAt(Date.now());
    });
    newPort.postMessage({
      type: 'state:sync',
    });
    setPort(newPort);
    setIsLoading(false);
    return () => {
      newPort.disconnect();
      setPort(null);
    };
  }, [channelName, lastDisconnectedAt]);

  if (isLoading) {
    return <LoadingState message="Connecting to extension..." />;
  }

  function setNotificationsEnabled(enabled: boolean) {
    port?.postMessage({
      type: 'state:set',
      data: { notificationsEnabled: enabled },
    });
  }

  function setOverlayEnabled(enabled: boolean) {
    port?.postMessage({
      type: 'state:set',
      data: { overlayEnabled: enabled },
    });
  }

  function setTheme(theme: 'light' | 'dark' | 'system') {
    port?.postMessage({
      type: 'state:set',
      data: { theme },
    });
  }

  function sendMessage(message: any) {
    port?.postMessage(message);
  }

  const value = {
    state: {
      ...state,
    },
    setNotificationsEnabled,
    setOverlayEnabled,
    setTheme,
    sendMessage,
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
