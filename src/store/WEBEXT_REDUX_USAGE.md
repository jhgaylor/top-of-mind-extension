# WebExt-Redux Usage Guide

This extension uses webext-redux to share Redux state across all extension contexts (background, popup, side panel, content scripts, and iframes).

## Architecture Overview

1. **Background Script**: Hosts the main Redux store wrapped with `wrapStore()`
2. **UI Components**: Use proxy stores that sync with the background store
3. **All Dispatches are Async**: webext-redux makes all dispatches asynchronous

## Key Components

### Background Script Setup
```typescript
// src/apps/background/index.ts
import { wrapStore } from 'webext-redux';
import { store } from '../../store';

wrapStore(store);
```

### Proxy Store Helper
```typescript
// src/store/proxy.ts
import { Store } from 'webext-redux';
import { RootState } from '../types/store';

export async function getProxyStore(): Promise<Store<RootState>> {
  const proxyStore = new Store<RootState>();
  await proxyStore.ready();
  return proxyStore;
}
```

### UI Component Setup
```typescript
// In any UI component (popup, sidepanel, iframe)
const [proxyStore, setProxyStore] = useState<Store<RootState> | null>(null);

useEffect(() => {
  getProxyStore()
    .then(setProxyStore)
    .catch(console.error);
}, []);

// Wrap with Provider
<Provider store={proxyStore}>
  <App />
</Provider>
```

## Using Redux in Components

### Async Dispatch Hook
Since all dispatches are async with webext-redux, use the custom hook:

```typescript
import { useAsyncAppDispatch, useAppSelector } from '../../../store';

function MyComponent() {
  const dispatch = useAsyncAppDispatch();
  const state = useAppSelector(state => state.ui);

  const handleAction = async () => {
    try {
      await dispatch(someAction());
      console.log('Action dispatched successfully');
    } catch (error) {
      console.error('Dispatch failed:', error);
    }
  };
}
```

### Example: Container Components
```typescript
function PopupContainer({ children }) {
  const dispatch = useAsyncAppDispatch();
  const { activePanel } = useAppSelector(state => state.ui);

  useEffect(() => {
    const initialize = async () => {
      await dispatch(setPopupOpen(true));
      await dispatch(setActivePanel('popup'));
    };

    initialize();

    return () => {
      dispatch(setPopupOpen(false));
    };
  }, [dispatch]);

  return <div>{children}</div>;
}
```

## State Synchronization

- State changes in any context automatically sync to all other contexts
- The background script is the source of truth
- Proxy stores receive updates via Chrome's messaging API
- No need to manually sync state between contexts

## Best Practices

1. **Always Handle Async Dispatches**: Use try-catch or .catch() for error handling
2. **Initialize on Mount**: Set up component state in useEffect
3. **Clean Up on Unmount**: Reset component-specific state when unmounting
4. **Use TypeScript**: Leverage the typed hooks for better developer experience

## Debugging

- Check background script console for store initialization
- Look for "Redux store wrapped" message
- Each UI component logs when it connects to the store
- Redux DevTools work in the background script context

## Message Handling

The existing Chrome messaging infrastructure remains intact and can be used alongside Redux:

```typescript
// Still works alongside Redux
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Handle messages
  // Redux state is automatically synced
});
```

## Common Issues

1. **Store Not Ready**: Always await `proxyStore.ready()` before using
2. **Serialization Errors**: Ensure all Redux state is serializable
3. **Async Timing**: Remember all dispatches return promises