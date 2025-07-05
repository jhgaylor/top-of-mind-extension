import { useEffect, useState } from 'react';
import { ExtensionMessage } from '../types';

export function usePopupMessaging() {
  const [eventCount, setEventCount] = useState<number>(0);
  const [lastEventType, setLastEventType] = useState<string>('');
  const [lastEventTime, setLastEventTime] = useState<number>(0);

  // Load saved count when popup opens
  useEffect(() => {
    chrome.storage.local.get(['eventCount', 'lastEventType', 'lastEventTime'], (result) => {
      if (result.eventCount) {
        setEventCount(result.eventCount);
        console.log('[Popup] Loaded saved event count:', result.eventCount);
      }
      if (result.lastEventType) {
        setLastEventType(result.lastEventType);
      }
      if (result.lastEventTime) {
        setLastEventTime(result.lastEventTime);
      }
    });
  }, []);

  // Setup message listener to count events
  useEffect(() => {
    const handleMessage = (message: ExtensionMessage) => {
      console.log('[Popup] Received message:', message);
      console.log('[Popup] Message type:', message.type);
      console.log('[Popup] Message source:', message.source);
      
      // Count all messages regardless of source
      if (message && typeof message.type === 'string') {
        setEventCount(prev => {
          const newCount = prev + 1;
          console.log('[Popup] Incrementing count from', prev, 'to', newCount);
          
          // Save to storage
          chrome.storage.local.set({ eventCount: newCount });
          
          return newCount;
        });
        
        const currentTime = Date.now();
        setLastEventType(message.type);
        setLastEventTime(currentTime);
        
        // Save last event info to storage
        chrome.storage.local.set({ 
          lastEventType: message.type,
          lastEventTime: currentTime
        });
      }
    };
    
    // Listen to all Chrome extension messages
    chrome.runtime.onMessage.addListener(handleMessage);
    
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  const formatLastEventTime = () => {
    if (!lastEventTime) return 'Never';
    return new Date(lastEventTime).toLocaleTimeString();
  };

  return {
    eventCount,
    lastEventType,
    lastEventTime: formatLastEventTime(),
  };
}