import { Presence, presenceConnectionListener } from './presence';

console.log('[Background] Service worker starting...');

function handleMessage(message: any, port: chrome.runtime.Port) {
  switch (message.type) {
    case 'state:sync':
      sendStateSync(port);
      break;
    default:
      break;
  }
}

function sendStateSync(port: chrome.runtime.Port) {
  port.postMessage({
    type: 'state:sync',
    data: {
      present: Presence.present
    }
  });
}

chrome.runtime.onInstalled.addListener(() => {
  console.log('[Background] Extension installed/updated');
});

chrome.runtime.onStartup.addListener(() => {
  console.log('[Background] Extension startup');
});

chrome.runtime.onConnect.addListener(presenceConnectionListener);

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((message, port) => {
    console.log('[Background] Message received:', message);
    handleMessage(message, port);
  });

  const unsubscribe = Presence.onChange((_present) => {
    sendStateSync(port);
  });

  port.onDisconnect.addListener(() => {
    unsubscribe();
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[Background] Message received:', message);
});

console.log('[Background] Service worker startup completed.');
