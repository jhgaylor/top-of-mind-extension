import React, { useState } from 'react';
import { Link } from 'wouter';
import { ToggleSetting } from '@/components/widgets';

interface PopupRootScreenProps {}

function PopupRootScreen({}: PopupRootScreenProps): React.ReactElement {
  const [overlayEnabled, setOverlayEnabled] = useState(false);
  const [sidePanelEnabled, setSidePanelEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="space-y-1">
      <div className="divide-y divide-gray-200">
        <ToggleSetting
          label="On-Screen Overlay"
          description="Show floating widget on web pages"
          enabled={overlayEnabled}
          onChange={setOverlayEnabled}
        />

        <ToggleSetting
          label="Side Panel"
          description="Enable quick access side panel"
          enabled={sidePanelEnabled}
          onChange={setSidePanelEnabled}
        />
        
        <ToggleSetting
          label="Notifications"
          description="Receive updates and reminders"
          enabled={notificationsEnabled}
          onChange={setNotificationsEnabled}
        />
      </div>

      <div className="pt-6 space-y-3">
        <button className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          Open Dashboard
        </button>
        
        <button className="w-full bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
          View Activity Log
        </button>
      </div>

      <div className="pt-6 text-center space-y-2">
        <Link href="/settings">
          <a className="text-xs text-blue-600 hover:text-blue-700">
            Advanced Settings →
          </a>
        </Link>
        <div>
          <a href="#" className="text-xs text-gray-500 hover:text-gray-700">
            About • Privacy • Support
          </a>
        </div>
      </div>
    </div>
  );
}

export default PopupRootScreen;
