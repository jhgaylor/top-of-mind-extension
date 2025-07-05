import { useCallback, useEffect, useState } from 'react';
import { ExtensionMessage, MESSAGE_TYPES } from '../types';

export function useSidePanelMessaging(frameId: string) {
  const [receivedMessages, setReceivedMessages] = useState<ExtensionMessage[]>([]);
  const [allMessages, setAllMessages] = useState<ExtensionMessage[]>([]);

  // Send message to content script
  const sendMessage = useCallback((type: string, payload?: any) => {
    const message: ExtensionMessage = {
      type,
      payload,
      frameId,
      timestamp: Date.now(),
      source: 'SIDE_PANEL',
    };
    
    console.log(`[${frameId}] Sending message to content script:`, message);
    
    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        console.error(`[${frameId}] Error sending message:`, chrome.runtime.lastError);
      } else {
        console.log(`[${frameId}] Message sent successfully`);
      }
    });
    
    setAllMessages(prev => [...prev, message]);
  }, [frameId]);

  // Send ready message when component mounts
  useEffect(() => {
    sendMessage(MESSAGE_TYPES.SIDE_PANEL_READY, { frameId });
  }, [sendMessage, frameId]);

  // Setup message listener for messages from content script
  useEffect(() => {
    const handleMessage = (message: ExtensionMessage) => {
      // Handle messages from content script (including forwarded iframe messages)
      if (message && typeof message.type === 'string' && message.source === 'CONTENT_SCRIPT') {
        console.log(`[${frameId}] Received message from content script:`, message);
        setReceivedMessages(prev => [...prev, message]);
        setAllMessages(prev => [...prev, message]);
      }
    };
    
    chrome.runtime.onMessage.addListener(handleMessage);
    
    return () => chrome.runtime.onMessage.removeListener(handleMessage);
  }, [frameId]);

  // Convenience methods for common message types
  const sendUserAction = useCallback((action: string, data?: any) => {
    sendMessage(MESSAGE_TYPES.USER_ACTION, { action, data });
  }, [sendMessage]);

  const sendStateUpdate = useCallback((state: any) => {
    sendMessage(MESSAGE_TYPES.STATE_UPDATE, state);
  }, [sendMessage]);

  const sendError = useCallback((error: string | Error) => {
    const errorMessage = error instanceof Error ? error.message : error;
    sendMessage(MESSAGE_TYPES.ERROR, { error: errorMessage });
  }, [sendMessage]);

  return {
    sendMessage,
    sendUserAction,
    sendStateUpdate,
    sendError,
    receivedMessages,
    allMessages,
  };
}