// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// components
import {Link} from 'react-router-dom';
import {Menu, Button, Responsive} from 'semantic-ui-react';
import SidebarOpenerIcon from 'containers/SidebarOpenerIcon';
import {Topbar, TopbarButton, TopbarTitle, Icon} from 'components/ui';
// other
import styles from './index.css';

function DashboardTopbar({}) {
  return (
    <Topbar className={styles.root}>
      <Menu.Menu position="left">
        <TopbarButton as={Link} to="/employees/new">
          <Icon name="add" />New employee
        </TopbarButton>
      </Menu.Menu>

      <Menu.Menu position="right">
        <TopbarButton>TBD</TopbarButton>
      </Menu.Menu>
    </Topbar>
  );
}
DashboardTopbar.propTypes = {};

export default DashboardTopbar;
