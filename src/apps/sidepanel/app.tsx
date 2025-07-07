import React from 'react';
import { Router, Route } from 'wouter';
// @ts-ignore - Parcel doesn't resolve wouter/memory-location properly
import { memoryLocation } from 'wouter/esm/memory-location.js';

import { BrowserStateProvider } from '@/components/providers';
import SidePanelLayout from '@/apps/sidepanel/layout';
import SidePanelRootScreen from '@/apps/sidepanel/screens/SidePanelRootScreen';

const SidePanelApp = (): React.ReactElement => {
  const { hook: locationHook } = memoryLocation({ path: "/" });

  return (
    <BrowserStateProvider channelName="sidepanel">
      <SidePanelLayout>
        <Router hook={locationHook}>
          <Route path="/" component={SidePanelRootScreen} />
        </Router>
      </SidePanelLayout>
    </BrowserStateProvider>
  );
};

export default SidePanelApp;
