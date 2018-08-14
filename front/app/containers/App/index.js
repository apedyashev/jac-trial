import React from 'react';
import {Helmet} from 'react-helmet';
import {compose} from 'redux';
import {Route} from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {RESTART_ON_REMOUNT} from 'utils/constants';
import {ConnectedSwitch, PrivateRoute} from 'utils/router';
// components
import {DashboardLayout} from 'containers/Layouts';
import {EmployeesPage, SettingsPage, NotFoundPage} from 'containers/screens';
import Notification from 'containers/Notification';
import reducer from './reducer';
import sidebarReducer from 'containers/SidebarOpenerIcon/reducer';
import saga from './saga';

export class App extends React.PureComponent {
  static propTypes = {};

  // important: https://github.com/ReactTraining/react-router/issues/5072#issuecomment-310184271
  render() {
    return (
      <div>
        <Helmet titleTemplate="%s - Test Task" defaultTitle="Test Task">
          <meta name="description" content="Test Task" />
        </Helmet>

        <React.StrictMode>
          <ConnectedSwitch>
            <PrivateRoute
              exact
              path="/employees"
              layout={DashboardLayout}
              component={EmployeesPage}
              authed
            />
            <PrivateRoute
              exact
              path="/settings"
              layout={DashboardLayout}
              component={SettingsPage}
              authed
            />
            <Route path="" component={NotFoundPage} />
          </ConnectedSwitch>
        </React.StrictMode>
        <Notification />
      </div>
    );
  }
}

const withReducer = injectReducer({key: 'app', reducer});
const withSidebarReducer = injectReducer({key: 'sidebar', reducer: sidebarReducer});
const withSaga = injectSaga({key: 'app', saga, mode: RESTART_ON_REMOUNT});

export default compose(
  withReducer,
  withSidebarReducer,
  withSaga
)(App);
