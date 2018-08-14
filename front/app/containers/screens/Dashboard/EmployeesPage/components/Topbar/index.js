// libs
import React from 'react';
// components
import {Link} from 'react-router-dom';
import {Menu} from 'semantic-ui-react';
import {Topbar, TopbarButton, Icon} from 'components/ui';
// other
import styles from './index.css';

function DashboardTopbar() {
  return (
    <Topbar className={styles.root}>
      <Menu.Menu position="left">
        <TopbarButton as={Link} to="/employees/new">
          <Icon name="add" />New employee
        </TopbarButton>
      </Menu.Menu>
    </Topbar>
  );
}
DashboardTopbar.propTypes = {};

export default DashboardTopbar;
