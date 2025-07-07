import React from 'react';
import { useTheme } from '@/hooks';

interface SidePanelLayoutProps {
  children: React.ReactNode;
}

function SidePanelLayout({ children }: SidePanelLayoutProps): React.ReactElement {
  useTheme();

  return (
    <div 
      className={`sidepanel-container min-h-screen dark:bg-gray-900 bg-gray-50`}
      data-active="true"
    >
      <header className={`sticky top-0 z-10 dark:bg-gray-800 bg-white shadow-sm`}>
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className={`text-lg font-semibold dark:text-white text-gray-900`}>
              Top of Mind
            </h1>
            <p className={`text-xs dark:text-gray-400 text-gray-600 mt-1`}>
              Your knowledge companion
            </p>
          </div>
        </div>
      </header>
      <main className={`dark:text-gray-100 text-gray-900`}>
        {children}
      </main>
    </div>
  );
}

export default SidePanelLayout;