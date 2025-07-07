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
      <main className={`dark:text-gray-100 text-gray-900`}>
        {children}
      </main>
    </div>
  );
}

export default SidePanelLayout;