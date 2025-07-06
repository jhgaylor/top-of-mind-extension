import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import rootReducer from './rootReducer';
import type { RootState, AppDispatch } from '../types/store';

// Configure the store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Chrome extension environment may have serialization issues
      // Configure as needed based on your extension's requirements
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        // Ignore these paths in the state
        ignoredPaths: ['ui.activePanel'],
      },
    }),
  // Disable Redux DevTools in production builds
  // For browser extensions, we check if we're in development mode
  devTools: true, // You can set this to false for production builds
});

// Export typed hooks for use throughout the app
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom hook for async dispatch with webext-redux
// Since webext-redux makes all dispatches async, we need to handle this properly
export const useAsyncAppDispatch = () => {
  const dispatch = useAppDispatch();
  
  // Return a wrapped dispatch that always returns a promise
  return (action: any) => {
    const result = dispatch(action);
    // If it's already a promise, return it
    if (result && typeof result.then === 'function') {
      return result;
    }
    // Otherwise, wrap it in a promise
    return Promise.resolve(result);
  };
};

// Optional: Add store persistence for Chrome extension
// You might want to integrate with chrome.storage.local
export const persistStore = async () => {
  try {
    const state = store.getState();
    await chrome.storage.local.set({ reduxState: state });
  } catch (error) {
    console.error('Failed to persist store:', error);
  }
};

export const rehydrateStore = async () => {
  try {
    const result = await chrome.storage.local.get('reduxState');
    if (result.reduxState) {
      // You'll need to dispatch actions to restore the state
      // or use a persistence library like redux-persist
      return result.reduxState;
    }
  } catch (error) {
    console.error('Failed to rehydrate store:', error);
  }
  return null;
};