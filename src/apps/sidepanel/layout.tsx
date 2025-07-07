import React, { useEffect } from 'react';
import { useAppSelector, useAsyncAppDispatch } from '@/store/hooks';
import { setActivePanel, setSidePanelOpen, setTheme } from '@/store/slices/uiSlice';
import { Toggle } from '@/components/atoms';

interface SidePanelLayoutProps {
  children: React.ReactNode;
}

function SidePanelLayout({ children }: SidePanelLayoutProps): React.ReactElement {
  const dispatch = useAsyncAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    // Set sidepanel as open and active on mount
    dispatch(setSidePanelOpen(true));
    dispatch(setActivePanel('sidepanel'));

    // Set up Chrome runtime message listener
    const messageListener = (request: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
      console.log('[SidePanel] Received message:', request);
      sendResponse({ received: true });
    };

    chrome.runtime.onMessage.addListener(messageListener);

    // Cleanup on unmount
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
      dispatch(setSidePanelOpen(false));
    };
  }, [dispatch]);

  const handleThemeToggle = () => {
    dispatch(setTheme(isDarkMode ? 'light' : 'dark'));
  };

  return (
    <div 
      className={`sidepanel-container min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      data-active="true"
    >
      <header className={`sticky top-0 z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Top of Mind
            </h1>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
              Your knowledge companion
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {isDarkMode ? '🌙' : '☀️'}
            </span>
            <Toggle
              checked={isDarkMode}
              onChange={handleThemeToggle}
              size="sm"
              aria-label="Toggle dark mode"
            />
          </div>
        </div>
      </header>
      <main className={`${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
        {children}
      </main>
    </div>
  );
}

export default SidePanelLayout;