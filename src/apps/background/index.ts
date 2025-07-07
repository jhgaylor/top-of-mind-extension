import { Presence, presenceConnectionListener } from './presence';
import { AppStateStore } from './state';


async function main() {  
  const stateStore = new AppStateStore();
  await stateStore.init();

  function handleMessage(message: any, port: chrome.runtime.Port) {
    switch (message.type) {
      case 'state:sync':
        sendStateSync(port);
        break;
      case 'state:set':
        setState(message.data);
        sendStateSync(port);
        break;
      default:
        break;
    }
  }

  function sendStateSync(port: chrome.runtime.Port) {
    try {
      port.postMessage({
        type: 'state:sync',
        data: {
          present: Presence.present,
          ...stateStore.state,
        }
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('Attempting to use a disconnected port')) {
        console.log('[Background] Port is disconnected, skipping state sync');
        return;
      } else {
        console.error('[Background] Error sending state sync:', error);
        throw error;
      }
    }
  }

  function setState(data: any) {
    console.log('[Background] Setting state:', data);
    stateStore.state = {
      ...stateStore.state,
      ...data,
    };
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
}

main()
