import React, { useState } from 'react';
import { Link } from 'wouter';
import { ToggleSetting } from '@/components/widgets';
import { Button } from '@/components/atoms';
import { useBrowserState } from '@/components/providers';

interface PopupRootScreenProps {}

function PopupRootScreen({}: PopupRootScreenProps): React.ReactElement {
  const { 
    state,
    setNotificationsEnabled,
    setOverlayEnabled,
  } = useBrowserState();
  const { notificationsEnabled, overlayEnabled, present } = state;

  const sidePanelEnabled = present.includes('sidepanel');
  function openSidePanel() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.sidePanel.open({ windowId: tabs[0].windowId, tabId: tabs[0].id });
      }
    });
  }

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
          label="Notifications"
          description="Receive updates and reminders"
          enabled={notificationsEnabled}
          onChange={setNotificationsEnabled}
        />
      </div>

      <div className="pt-6 space-y-3">
        <Button 
          onClick={() => openSidePanel()} 
          disabled={sidePanelEnabled}
          fullWidth
          variant="primary"
          size="md"
        >
          Open Side Panel
        </Button>
      </div>

      <div className="pt-6 text-center space-y-2">
        <Link href="/settings">
          Advanced Settings →
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
