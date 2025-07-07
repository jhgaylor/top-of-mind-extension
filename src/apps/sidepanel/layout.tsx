import React, { useEffect } from 'react';
import { Toggle } from '@/components/atoms';

interface SidePanelLayoutProps {
  children: React.ReactNode;
}

function SidePanelLayout({ children }: SidePanelLayoutProps): React.ReactElement {
  const isDarkMode = false;

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
              onChange={() => {}}
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