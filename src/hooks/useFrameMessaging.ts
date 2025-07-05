import { useCallback, useEffect, useState } from 'react';
import { FrameMessage, UnifiedMessage, MESSAGE_TYPES } from '../types';

export function useFrameMessaging(frameId: string) {
  const [allMessages, setAllMessages] = useState<UnifiedMessage[]>([]);

  // Send message to parent
  const sendMessage = useCallback((type: string, payload?: any) => {
    const message: FrameMessage = {
      type,
      payload,
      frameId,
      timestamp: Date.now(),
    };
    
    console.log(`[${frameId}] Sending message:`, message);
    window.parent.postMessage(message, '*');
  }, [frameId]);

  // Send ready message when component mounts
  useEffect(() => {
    sendMessage(MESSAGE_TYPES.FRAME_READY, { frameId });
  }, [sendMessage, frameId]);

  // Listen for broadcast messages from parent
  useEffect(() => {
    const handleBroadcastMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'BROADCAST_MESSAGE') {
        console.log(`[${frameId}] Received broadcast message:`, event.data.originalMessage);
        setAllMessages(prev => [...prev, event.data.originalMessage]);
      }
    };

    window.addEventListener('message', handleBroadcastMessage);

    return () => {
      window.removeEventListener('message', handleBroadcastMessage);
    };
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
    allMessages,
  };
}