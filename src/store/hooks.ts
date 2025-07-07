import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../types/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Async dispatch hook for webext-redux
export const useAsyncAppDispatch = () => {
  const dispatch = useAppDispatch();
  return (action: any) => {
    return dispatch(action);
  };
};