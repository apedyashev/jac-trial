// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Link} from 'react-router-dom';
// other
import styles from './index.css';

export default function EmployeesListItem({data, style}) {
  return (
    <Link to={`/employees/${data.id}`} style={style} className={styles.root}>
      <img src={data.avatar} alt="" className={styles.avatar} />
      <div className={styles.details}>
        <h4>
          {data.firstName} {data.lastName} <span>{data.position}</span>
        </h4>
        <span>{data.email}</span>
      </div>
    </Link>
  );
}
EmployeesListItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  style: PropTypes.object,
};
