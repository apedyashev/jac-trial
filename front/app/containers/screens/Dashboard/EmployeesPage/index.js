import React from 'react';
import {Helmet} from 'react-helmet';
// components
import {AppContainer} from 'components';
import {Topbar} from './components';
import EmployeesList from './components/EmployeesList';

export default function EmployeesPage() {
  return (
    <div>
      <Helmet>
        <title>Employees</title>
      </Helmet>
      <AppContainer withMobileTopbar withDesktopTopbar topbar={<Topbar />}>
        <EmployeesList />
      </AppContainer>
    </div>
  );
}
EmployeesPage.propTypes = {};
