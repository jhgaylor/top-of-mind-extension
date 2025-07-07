import React from 'react';
import { Link } from 'wouter';
import { ThemeSelector } from '@/components/widgets';

function SettingsScreen(): React.ReactElement {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Advanced Settings</h2>
        <Link href="/">
          <a className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">← Back</a>
        </Link>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Data & Privacy</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Clear local data</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">→</span>
              </div>
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Export data</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">→</span>
              </div>
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Appearance</h3>
          <div className="space-y-4">
            <ThemeSelector />
            <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Widget position</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Bottom right</span>
              </div>
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">About</h3>
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400">Version 1.0.0</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">© 2024 Top of Mind</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsScreen;