// Background script for Chrome extension messaging relay
// This script relays messages between side panel and content script

import { createWrapStore } from 'webext-redux';
import { store } from '../../store';

console.log('[Background] Service worker starting...');

// Create and wrap the Redux store for webext-redux
const wrapStore = createWrapStore();
wrapStore(store);
console.log('[Background] Redux store wrapped with webext-redux');

// Helper function to send message with retry
function sendMessageWithRetry(tabId: number, message: any, retryCount = 0) {
  chrome.tabs.sendMessage(tabId, message, (response) => {
    if (chrome.runtime.lastError) {
      const error = chrome.runtime.lastError.message;
      console.warn(`[Background] Attempt ${retryCount + 1} failed for tab ${tabId}:`, error);
      
      if (retryCount < 2 && error && error.includes('Receiving end does not exist')) {
        // Retry after a short delay
        setTimeout(() => {
          sendMessageWithRetry(tabId, message, retryCount + 1);
        }, 500);
      } else {
        console.error(`[Background] Failed to send message to tab ${tabId} after ${retryCount + 1} attempts`);
      }
    } else {
      console.log(`[Background] Message sent to content script in tab ${tabId} successfully`);
    }
  });
}

// Handle messages from side panel and content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[Background] Received message:', message, 'from:', sender);
  
  // Validate message structure
  if (!message || !message.type || !message.source) {
    console.warn('[Background] Invalid message received:', message);
    return;
  }

  // Handle messages from side panel -> forward to content script
  if (message.source === 'SIDE_PANEL') {
    console.log('[Background] Forwarding message from side panel to content script:', message);
    
    // Find tabs with jakegaylor.com content scripts
    chrome.tabs.query({url: '*://jakegaylor.com/*'}, (tabs) => {
      if (tabs.length === 0) {
        console.warn('[Background] No jakegaylor.com tabs found with content script');
        return;
      }
      
      // Send message to all jakegaylor.com tabs
      tabs.forEach(tab => {
        if (tab.id) {
          sendMessageWithRetry(tab.id, message);
        }
      });
    });
  }
  
  // Handle messages from content script -> forward to side panel
  else if (message.source === 'CONTENT_SCRIPT') {
    console.log('[Background] Forwarding message from content script to side panel:', message);
    
    // Side panel messages are handled differently - they're broadcast to all extension contexts
    // The side panel will receive this through its chrome.runtime.onMessage listener
    // We just need to log this for debugging purposes
    console.log('[Background] Content script message will be automatically delivered to side panel');
  }
  
  // Handle messages from iframe components (via content script) -> forward to side panel
  else if (!message.source && message.frameId) {
    console.log('[Background] Forwarding iframe message to side panel:', message);
    // These are iframe messages that have been relayed through the content script
    // They should also be forwarded to the side panel for the event list
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

console.log('[Background] Service worker initialized');
