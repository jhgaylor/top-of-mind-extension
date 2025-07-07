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