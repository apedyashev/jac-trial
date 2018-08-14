import React from 'react';
import {Helmet} from 'react-helmet';
import {compose} from 'redux';
import {Route, Redirect} from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import {ConnectedSwitch, PrivateRoute} from 'utils/router';
// components
import {DashboardLayout} from 'containers/layouts';
import {EmployeesPage, EmployeeEditPage, EmployeePage, NotFoundPage} from 'containers/screens';
import Notification from 'containers/Notification';
import sidebarReducer from 'containers/SidebarOpenerIcon/reducer';

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
            <Redirect exact from="/" to="/employees" />
            <PrivateRoute
              exact
              path="/employees/new"
              layout={DashboardLayout}
              component={EmployeeEditPage}
              authed
            />
            <PrivateRoute
              path="/employees/:id/edit"
              layout={DashboardLayout}
              component={EmployeeEditPage}
              authed
            />
            <PrivateRoute
              path="/employees/:id"
              layout={DashboardLayout}
              component={EmployeePage}
              authed
            />
            <PrivateRoute
              exact
              path="/employees"
              layout={DashboardLayout}
              component={EmployeesPage}
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

const withSidebarReducer = injectReducer({key: 'sidebar', reducer: sidebarReducer});

export default compose(withSidebarReducer)(App);
