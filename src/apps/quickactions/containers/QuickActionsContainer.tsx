import React, { useEffect } from 'react';
import { useAppSelector, useAsyncAppDispatch } from '../../../store';
import { setActivePanel, setQuickActionsOpen, setTheme } from '../../../store/slices/uiSlice';

interface QuickActionsContainerProps {
  children: React.ReactNode;
}

function QuickActionsContainer({ children }: QuickActionsContainerProps): React.ReactElement {
  const dispatch = useAsyncAppDispatch();
  const { activePanel, isQuickActionsOpen, theme } = useAppSelector((state) => state.ui);

  useEffect(() => {
    // Mark quick actions as open and active when component mounts
    const initializeQuickActions = async () => {
      try {
        await dispatch(setQuickActionsOpen(true));
        await dispatch(setActivePanel('quickactions'));
        console.log('[QuickActionsContainer] Initialized quick actions state');
      } catch (error) {
        console.error('[QuickActionsContainer] Failed to initialize:', error);
      }
    };

    initializeQuickActions();

    // Cleanup when component unmounts
    return () => {
      dispatch(setQuickActionsOpen(false)).catch((error: unknown) => {
        console.error('[QuickActionsContainer] Failed to cleanup:', error);
      });
    };
  }, [dispatch]); // Only depend on dispatch, which is stable

  // Separate effect for theme updates
  useEffect(() => {
    // Apply theme to the body
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div 
      className="quickactions-container" 
      data-active={activePanel === 'quickactions'}
      style={{
        backgroundColor: theme === 'light' ? '#ffffff' : '#1a1a1a',
        color: theme === 'light' ? '#000000' : '#ffffff',
        minHeight: '100vh',
        transition: 'background-color 0.3s, color 0.3s'
      }}
    >
      <div style={{ 
        padding: '16px', 
        borderBottom: `1px solid ${theme === 'light' ? '#e0e0e0' : '#333'}`,
        backgroundColor: theme === 'light' ? '#f5f5f5' : '#2a2a2a'
      }}>
        <h3 style={{ margin: '0 0 8px 0' }}>Redux Store Demo - Quick Actions</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>Current Theme: <strong>{theme}</strong></span>
          <div style={{
            padding: '4px 8px',
            backgroundColor: theme === 'light' ? '#e0e0e0' : '#444',
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            Theme synced from Redux store
          </div>
        </div>
        <p style={{ fontSize: '12px', color: theme === 'light' ? '#666' : '#aaa', marginTop: '8px' }}>
          Toggle the theme from the popup or side panel to see it update here instantly!
        </p>
      </div>
      <div style={{ padding: '16px' }}>
        {children}
      </div>
    </div>
  );
}

export default QuickActionsContainer;
