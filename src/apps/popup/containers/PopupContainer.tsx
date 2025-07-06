import React, { useEffect } from 'react';
import { useAppSelector, useAsyncAppDispatch } from '../../../store';
import { setActivePanel, setPopupOpen, setTheme } from '../../../store/slices/uiSlice';

interface PopupContainerProps {
  children: React.ReactNode;
}

function PopupContainer({ children }: PopupContainerProps): React.ReactElement {
  const dispatch = useAsyncAppDispatch();
  const { activePanel, isPopupOpen, theme } = useAppSelector((state) => state.ui);

  useEffect(() => {
    // Mark popup as open and active when component mounts
    const initializePopup = async () => {
      try {
        await dispatch(setPopupOpen(true));
        await dispatch(setActivePanel('popup'));
        console.log('[PopupContainer] Initialized popup state');
      } catch (error) {
        console.error('[PopupContainer] Failed to initialize:', error);
      }
    };

    initializePopup();

    // Cleanup when component unmounts
    return () => {
      dispatch(setPopupOpen(false)).catch((error: unknown) => {
        console.error('[PopupContainer] Failed to cleanup:', error);
      });
    };
  }, [dispatch]);

  const handleThemeToggle = async () => {
    try {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      await dispatch(setTheme(newTheme));
      console.log('[PopupContainer] Theme changed to:', newTheme);
    } catch (error) {
      console.error('[PopupContainer] Failed to change theme:', error);
    }
  };

  return (
    <div className="popup-container" data-active={activePanel === 'popup'}>
      <div style={{ padding: '16px', borderBottom: '1px solid #e0e0e0' }}>
        <h3 style={{ margin: '0 0 8px 0' }}>Redux Store Demo - Popup</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Current Theme: <strong>{theme}</strong></span>
          <button 
            onClick={handleThemeToggle}
            style={{
              padding: '4px 12px',
              backgroundColor: theme === 'light' ? '#333' : '#fff',
              color: theme === 'light' ? '#fff' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Toggle to {theme === 'light' ? 'Dark' : 'Light'}
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}

export default PopupContainer;
