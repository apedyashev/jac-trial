// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {createStructuredSelector} from 'reselect';
// actions
import {hideSidebar} from 'containers/SidebarOpenerIcon/actions';
// selectors
import {makeSelectLocationPath} from 'containers/App/selectors';
// components
import {Sidebar} from 'components/ui';
import UserMenuButton from '../UserMenuButton';
// other
import {sidebarUserType} from 'propTypes/user';
import styles from './index.css';

// eslint-disable-next-line no-shadow
function DashboardSidebar({userData, visible, push, hideSidebar, onHide}) {
  const items = [
    {
      key: 'employees',
      title: 'employees',
      iconName: 'user',
      linkTo: '/employees',
      onClick() {
        hideSidebar();
      },
    },

    <UserMenuButton
      key="user-menu-btn"
      userData={userData}
      className={styles.profile}
      onClick={hideSidebar}
    />,
  ];

  return <Sidebar items={items} visible={visible} onHide={onHide} />;
}
DashboardSidebar.propTypes = {
  hideSidebar: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  onHide: PropTypes.func,
  visible: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  // locationPath isn't used but required to update NavLinks state in the sidebar
  locationPath: makeSelectLocationPath(),
});
export default connect(
  mapStateToProps,
  {
    push,
    hideSidebar,
  }
)(DashboardSidebar);
