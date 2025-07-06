import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState, PanelType } from '../../types/store';

const initialState: UIState = {
  activePanel: null,
  isPopupOpen: false,
  isSidePanelOpen: false,
  isQuickActionsOpen: false,
  theme: 'light',
  compactMode: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActivePanel: (state, action: PayloadAction<PanelType | null>) => {
      state.activePanel = action.payload;
    },
    togglePopup: (state) => {
      state.isPopupOpen = !state.isPopupOpen;
    },
    setPopupOpen: (state, action: PayloadAction<boolean>) => {
      state.isPopupOpen = action.payload;
    },
    toggleSidePanel: (state) => {
      state.isSidePanelOpen = !state.isSidePanelOpen;
    },
    setSidePanelOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidePanelOpen = action.payload;
    },
    toggleQuickActions: (state) => {
      state.isQuickActionsOpen = !state.isQuickActionsOpen;
    },
    setQuickActionsOpen: (state, action: PayloadAction<boolean>) => {
      state.isQuickActionsOpen = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleCompactMode: (state) => {
      state.compactMode = !state.compactMode;
    },
    setCompactMode: (state, action: PayloadAction<boolean>) => {
      state.compactMode = action.payload;
    },
    // Reset all panels to closed state
    closeAllPanels: (state) => {
      state.activePanel = null;
      state.isPopupOpen = false;
      state.isSidePanelOpen = false;
      state.isQuickActionsOpen = false;
    },
  },
});

// Export actions
export const {
  setActivePanel,
  togglePopup,
  setPopupOpen,
  toggleSidePanel,
  setSidePanelOpen,
  toggleQuickActions,
  setQuickActionsOpen,
  setTheme,
  toggleCompactMode,
  setCompactMode,
  closeAllPanels,
} = uiSlice.actions;

// Export reducer
export default uiSlice.reducer;