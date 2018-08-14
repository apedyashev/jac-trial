// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// components
import {Link} from 'react-router-dom';
import {Dropdown} from 'components/ui';
import DeleteEmployeeAction from '../DeleteEmployeeAction';
// other
import styles from './index.css';

export default function ActionsDropdown({employeeId, right}) {
  const options = [
    {
      key: 'edit',
      as: Link,
      to: `/employees/${employeeId}/edit`,
      text: 'Edit',
    },
    {
      key: 'delete',
      text: <DeleteEmployeeAction employeeId={employeeId} />,
    },
  ];
  return (
    <Dropdown button options={options} text="Actions" className={cn({[styles.right]: right})} />
  );
}
ActionsDropdown.propTypes = {};
