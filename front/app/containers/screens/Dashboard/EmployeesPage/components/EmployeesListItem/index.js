// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
// other
import styles from './index.css';

export default function EmployeesListItem({data, style}) {
  return (
    <div style={style} className={styles.root}>
      <img src={data.avatar} alt="" className={styles.avatar} />
      <div className={styles.details}>
        <h4>
          {data.firstName} {data.lastName} <span>{data.position}</span>
        </h4>
        <span>{data.email}</span>
      </div>
    </div>
  );
}
EmployeesListItem.propTypes = {};
