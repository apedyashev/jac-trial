// libs
import React from 'react';
// components
import {AppContainer} from 'components';
import StandardTopbar from 'containers/StandardTopbar';

export default function SettingsPage() {
  return (
    <AppContainer topbar={<StandardTopbar title="settings" />} withMobileTopbar withPadding>
      <div>TDB</div>
    </AppContainer>
  );
}
SettingsPage.propTypes = {};
