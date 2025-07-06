import { combineReducers } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';

const rootReducer = combineReducers({
  ui: uiReducer,
  // Add more reducers here as you create them
  // Example:
  // auth: authReducer,
  // data: dataReducer,
});

export default rootReducer;