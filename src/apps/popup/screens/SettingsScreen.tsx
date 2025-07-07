import React from 'react';
import { Link } from 'wouter';

function SettingsScreen(): React.ReactElement {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Advanced Settings</h2>
        <Link href="/">
          <a className="text-sm text-blue-600 hover:text-blue-700">← Back</a>
        </Link>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Data & Privacy</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Clear local data</span>
                <span className="text-xs text-gray-500">→</span>
              </div>
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Export data</span>
                <span className="text-xs text-gray-500">→</span>
              </div>
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Appearance</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Theme preferences</span>
                <span className="text-xs text-gray-500">Light</span>
              </div>
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Widget position</span>
                <span className="text-xs text-gray-500">Bottom right</span>
              </div>
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">About</h3>
          <div className="px-4 py-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">Version 1.0.0</p>
            <p className="text-xs text-gray-600 mt-1">© 2024 Top of Mind</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsScreen;