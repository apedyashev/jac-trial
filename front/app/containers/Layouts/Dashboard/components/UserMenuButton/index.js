// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {NavLink} from 'react-router-dom';
import {DropdownIcon} from 'components/ui';

export default function UserMenuButton({className, onClick}) {
  const options = [
    {
      key: 'user',
      text: (
        <span>
          logged in as <strong>admin</strong>
        </span>
      ),
      disabled: true,
    },
    {
      key: 'settings',
      text: 'settings',
      as: NavLink,
      exact: true,
      to: '/settings',
      onClick,
    },
  ];

  return <DropdownIcon options={options} iconName="user" hoverable upward className={className} />;
}
UserMenuButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
UserMenuButton.defaultProps = {
  className: '',
};
