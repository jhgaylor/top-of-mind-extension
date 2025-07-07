import { createWrapStore } from 'webext-redux';
import { store } from '../../store';

console.log('[Background] Service worker starting...');

const wrapStore = createWrapStore();
wrapStore(store);
console.log('[Background] Redux store wrapped with webext-redux');

function validateMessage(message: any) {
  if (!message || !message.type || !message.source) {
    console.warn('[Background] Invalid message received:', message);
    return false;
  }
  return true;
}

// Handle messages from other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[Background] Received message:', message, 'from:', sender);
  
  // Validate message structure
  if (!validateMessage(message)) {
    console.warn('[Background] Invalid message received:', message);
    return;
  }

  switch (message.source) {
    case 'SIDE_PANEL':
      console.log('[Background] Handling message from side panel', message);
      break;
    case 'CONTENT_SCRIPT':
      console.log('[Background] Handling message from content script:', message);
      break;
    default:
      console.warn('[Background] Unknown message source:', message);
      break;
  }

  // Keep the message channel open for async response
  return true;
});

// Handle extension installation/startup
chrome.runtime.onInstalled.addListener(() => {
  console.log('[Background] Extension installed/updated');
});

chrome.runtime.onStartup.addListener(() => {
  console.log('[Background] Extension startup');
});

// Track connected contexts
const connectedContexts: Record<'popup' | 'sidepanel', boolean> = {
  popup: false,
  sidepanel: false
};

// Handle port connections for presence tracking
chrome.runtime.onConnect.addListener((port) => {
  console.log('[Background] Port connected:', port.name);
  
  // Track connection based on port name
  if (port.name === 'popup' || port.name === 'sidepanel') {
    connectedContexts[port.name] = true;
    console.log('[Background] Current presence state:', connectedContexts);
    
    // Handle disconnection
    port.onDisconnect.addListener(() => {
      console.log('[Background] Port disconnected:', port.name);
      connectedContexts[port.name as 'popup' | 'sidepanel'] = false;
      console.log('[Background] Current presence state:', connectedContexts);
    });
  }
});

console.log('[Background] Service worker initialized');
