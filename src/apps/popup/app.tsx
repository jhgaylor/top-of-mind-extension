import React from 'react';
import { Router, Route } from 'wouter';
// @ts-ignore - Parcel doesn't resolve wouter/memory-location properly
import { memoryLocation } from 'wouter/esm/memory-location.js';

import PopupLayout from './layout';
import PopupRootScreen from './screens/PopupRootScreen';
import SettingsScreen from './screens/SettingsScreen';
import { BrowserStateProvider } from '@/components/providers';

const PopupApp = () => {
  const {hook: locationHook} = memoryLocation({ path: "/" });

  return (
    <BrowserStateProvider channelName="popup">
      <PopupLayout>
        <Router hook={locationHook}>
          <Route path="/" component={PopupRootScreen} />
          <Route path="/settings" component={SettingsScreen} />
        </Router>
      </PopupLayout>
    </BrowserStateProvider>
  );
};

export default PopupApp;
