// Store type definitions
export type PanelType = 'popup' | 'sidepanel' | 'quickactions';

export interface UIState {
  activePanel: PanelType | null;
  isPopupOpen: boolean;
  isSidePanelOpen: boolean;
  isQuickActionsOpen: boolean;
  theme: 'light' | 'dark';
  compactMode: boolean;
}

// Root state type will be inferred from the store
export type RootState = ReturnType<typeof import('../store/rootReducer').default>;
export type AppDispatch = typeof import('../store').store.dispatch;