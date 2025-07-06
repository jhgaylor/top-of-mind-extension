# Redux Store Setup

This directory contains the Redux store configuration for the Chrome extension.

## Structure

- `index.ts` - Main store configuration with typed hooks
- `rootReducer.ts` - Combines all Redux slices
- `StoreProvider.tsx` - React Provider component for the store
- `slices/` - Directory containing all Redux slices
  - `uiSlice.ts` - Manages UI state (panels, theme, preferences)

## Usage

### 1. Wrap your app with the StoreProvider

```tsx
import { StoreProvider } from './store/StoreProvider';

function App() {
  return (
    <StoreProvider>
      {/* Your app components */}
    </StoreProvider>
  );
}
```

### 2. Use typed hooks in components

```tsx
import { useAppSelector, useAppDispatch } from '../store';
import { togglePopup, setTheme } from '../store/slices/uiSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const { isPopupOpen, theme } = useAppSelector((state) => state.ui);

  const handleToggle = () => {
    dispatch(togglePopup());
  };

  const handleThemeChange = () => {
    dispatch(setTheme('dark'));
  };

  return (
    <div>
      <button onClick={handleToggle}>
        {isPopupOpen ? 'Close' : 'Open'} Popup
      </button>
      <button onClick={handleThemeChange}>
        Current theme: {theme}
      </button>
    </div>
  );
}
```

### 3. Adding new slices

To add a new slice:

1. Create a new file in `slices/` directory
2. Define the slice using `createSlice` from Redux Toolkit
3. Import and add the reducer to `rootReducer.ts`
4. Update types in `/src/types/store.ts` if needed

Example:

```ts
// slices/dataSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  items: string[];
  loading: boolean;
}

const initialState: DataState = {
  items: [],
  loading: false,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      state.items.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { addItem, setLoading } = dataSlice.actions;
export default dataSlice.reducer;
```

### 4. Chrome Extension Storage Integration

The store includes helper functions for persisting state to Chrome's storage:

```ts
import { persistStore, rehydrateStore } from './store';

// Save current state to chrome.storage.local
await persistStore();

// Restore state from chrome.storage.local
const savedState = await rehydrateStore();
```

For automatic persistence, consider using `redux-persist` with a Chrome storage adapter.