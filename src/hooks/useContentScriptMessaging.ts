import { useCallback, useEffect, useState } from 'react';
import { FrameMessage, ExtensionMessage, UnifiedMessage } from '../types';

export function useContentScriptMessaging() {
  const [allMessages, setAllMessages] = useState<UnifiedMessage[]>([]);

  // Message bus for broadcasting to listeners
  const [listeners, setListeners] = useState<Array<(message: UnifiedMessage) => void>>([]);

  const addListener = useCallback((listener: (message: UnifiedMessage) => void) => {
    setListeners(prev => [...prev, listener]);
  }, []);

  const removeListener = useCallback((listener: (message: UnifiedMessage) => void) => {
    setListeners(prev => prev.filter(l => l !== listener));
  }, []);

  const broadcast = useCallback((message: UnifiedMessage) => {
    listeners.forEach(listener => {
      try {
        listener(message);
      } catch (error) {
        console.error('[ContentScriptMessaging] Error in listener:', error);
      }
    });
  }, [listeners]);

  const reconcileMessage = useCallback((message: UnifiedMessage) => {
    // Add timestamp if not present
    if (!message.timestamp) {
      message.timestamp = Date.now();
    }

    console.log('[ContentScriptMessaging] Processing message:', message);
    setAllMessages(prev => [...prev, message]);
    broadcast(message);
  }, [broadcast]);

  // Handle iframe messages
  useEffect(() => {
    const handleIframeMessage = (event: MessageEvent) => {
      // Only handle messages from our own extension
      if (event.origin !== window.location.origin) {
        return;
      }
      
      // Validate message structure
      if (event.data && typeof event.data.type === 'string') {
        const message = event.data as FrameMessage;
        console.log('[ContentScriptMessaging] Received message from iframe:', message);
        reconcileMessage(message);
        
        // Forward to extension
        const extensionMessage: ExtensionMessage = {
          type: message.type,
          payload: message.payload,
          frameId: message.frameId,
          timestamp: message.timestamp,
          source: 'CONTENT_SCRIPT'
        };
        
        chrome.runtime.sendMessage(extensionMessage);
      }
    };
    
    window.addEventListener('message', handleIframeMessage);
    return () => window.removeEventListener('message', handleIframeMessage);
  }, [reconcileMessage]);

  // Handle extension messages
  useEffect(() => {
    const handleExtensionMessage = (message: ExtensionMessage) => {
      // Validate message structure
      if (message && typeof message.type === 'string' && message.source) {
        console.log('[ContentScriptMessaging] Received message from extension:', message);
        reconcileMessage(message);
      }
    };
    
    chrome.runtime.onMessage.addListener(handleExtensionMessage);
    return () => chrome.runtime.onMessage.removeListener(handleExtensionMessage);
  }, [reconcileMessage]);

  // Send to side panel
  const sendToSidePanel = useCallback((type: string, payload?: any, frameId?: string) => {
    const message: ExtensionMessage = {
      type,
      payload,
      frameId,
      timestamp: Date.now(),
      source: 'CONTENT_SCRIPT',
    };
    
    chrome.runtime.sendMessage(message);
  }, []);

  // Broadcast to iframes
  const broadcastToIframes = useCallback((message: UnifiedMessage) => {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      if (iframe.contentWindow) {
        iframe.contentWindow.postMessage({
          type: 'BROADCAST_MESSAGE',
          originalMessage: message,
          timestamp: Date.now()
        }, '*');
      }
    });
  }, []);

  return {
    allMessages,
    addListener,
    removeListener,
    sendToSidePanel,
    broadcastToIframes,
    reconcileMessage,
  };
}