import React, { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { EmptyState, TabNavigation } from '@/apps/sidepanel/widgets';

interface SidePanelRootScreenProps {}

function SidePanelRootScreen({}: SidePanelRootScreenProps): React.ReactElement {
  const theme = useAppSelector((state) => state.ui.theme);
  const isDarkMode = theme === 'dark';
  const [activeTab, setActiveTab] = useState('recent');

  const tabs = [
    { id: 'recent', label: 'Recent', icon: '📌' },
    { id: 'collections', label: 'Collections', icon: '📁' },
    { id: 'search', label: 'Search', icon: '🔍' }
  ];

  return (
    <div className="h-full">
      {/* Tab Navigation */}
      <TabNavigation 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isDarkMode={isDarkMode}
      />

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'recent' && (
          <div className="space-y-4">
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Items
            </h2>
            <EmptyState
              message="No recent items yet. Start browsing to save content!"
              icon="📝"
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {activeTab === 'collections' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Collections
              </h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">
                + New Collection
              </button>
            </div>
            <EmptyState
              message="Create collections to organize your saved content"
              icon="📚"
              action={{
                label: "Create your first collection",
                onClick: () => console.log('Create collection')
              }}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {activeTab === 'search' && (
          <div className="space-y-4">
            <input
              type="search"
              placeholder="Search your saved content..."
              className={`
                w-full px-4 py-2 rounded-lg border
                ${isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500
              `}
            />
            <EmptyState
              message="Start typing to search..."
              icon="🔎"
              isDarkMode={isDarkMode}
            />
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
        <button className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          Quick Capture
        </button>
      </div>
    </div>
  );
}

export default SidePanelRootScreen;
