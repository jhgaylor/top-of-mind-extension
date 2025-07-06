import React, { useEffect } from 'react';
import { useAppSelector, useAsyncAppDispatch } from '../../../store';
import { setActivePanel, setSidePanelOpen, setTheme } from '../../../store/slices/uiSlice';

interface SidePanelContainerProps {
  children: React.ReactNode;
}

function SidePanelContainer({ children }: SidePanelContainerProps): React.ReactElement {
  const dispatch = useAsyncAppDispatch();
  const { activePanel, isSidePanelOpen, theme } = useAppSelector((state) => state.ui);

  useEffect(() => {
    // Mark side panel as open and active when component mounts
    const initializeSidePanel = async () => {
      try {
        await dispatch(setSidePanelOpen(true));
        await dispatch(setActivePanel('sidepanel'));
        console.log('[SidePanelContainer] Initialized side panel state');
      } catch (error) {
        console.error('[SidePanelContainer] Failed to initialize:', error);
      }
    };

    initializeSidePanel();

    // Listen for messages from content script and background
    const handleMessage = (message: any, sender: chrome.runtime.MessageSender, sendResponse: any) => {
      console.log('[SidePanelContainer] Received message:', message);
      // Handle messages as needed
      // The Redux state will be automatically synced across all contexts
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    // Cleanup when component unmounts
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
      dispatch(setSidePanelOpen(false)).catch((error: unknown) => {
        console.error('[SidePanelContainer] Failed to cleanup:', error);
      });
    };
  }, [dispatch]);

  const handleThemeToggle = async () => {
    try {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      await dispatch(setTheme(newTheme));
      console.log('[SidePanelContainer] Theme changed to:', newTheme);
    } catch (error) {
      console.error('[SidePanelContainer] Failed to change theme:', error);
    }
  };

  return (
    <div className="sidepanel-container" data-active={activePanel === 'sidepanel'}>
      <div style={{ padding: '16px', borderBottom: '1px solid #e0e0e0' }}>
        <h3 style={{ margin: '0 0 8px 0' }}>Redux Store Demo - Side Panel</h3>
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
        <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
          Changes made here will be instantly reflected in the popup and quick actions!
        </p>
      </div>
      {children}
    </div>
  );
}

export default SidePanelContainer;
