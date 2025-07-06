import { Store } from 'webext-redux';
import { RootState } from '../types/store';

let proxyStore: Store<RootState> | null = null;

/**
 * Creates or returns the existing proxy store for UI components
 * This store connects to the background script's Redux store via webext-redux
 */
export async function getProxyStore(): Promise<Store<RootState>> {
  if (proxyStore) {
    return proxyStore;
  }

  // Create a new proxy store instance
  proxyStore = new Store<RootState>();

  // Wait for the store to be ready (connected to background script)
  await proxyStore.ready();

  console.log('[ProxyStore] Connected to background Redux store');

  return proxyStore;
}

/**
 * Helper to check if the proxy store is ready
 */
export function isProxyStoreReady(): boolean {
  return proxyStore !== null;
}