import React from 'react';

interface QuickActionScreenProps {}

function QuickActionScreen({}: QuickActionScreenProps): React.ReactElement {
  const actions = [
    { id: 1, label: 'Save to Top of Mind', icon: '💾' },
    { id: 2, label: 'Add Quick Note', icon: '📝' },
    { id: 3, label: 'Set Reminder', icon: '⏰' },
    { id: 4, label: 'Tag This Page', icon: '🏷️' },
  ];

  return (
    <div className="p-4 space-y-3">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Quick actions for this page
      </div>
      
      {actions.map((action) => (
        <button
          key={action.id}
          className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
          onClick={() => console.log(`Action: ${action.label}`)}
        >
          <span className="text-xl">{action.icon}</span>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {action.label}
          </span>
        </button>
      ))}
      
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Press ESC to close
        </div>
      </div>
    </div>
  );
}

export default QuickActionScreen;