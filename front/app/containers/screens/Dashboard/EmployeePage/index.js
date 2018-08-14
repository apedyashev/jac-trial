// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import gql from 'graphql-tag';
// components
import {Query} from 'react-apollo';
import {AppContainer} from 'components';
import {Avatar, Paper, H4, PageLoader, Prompt} from 'components/ui';

import ActionsDropdown from './components/ActionsDropdown';
// other
import styles from './index.css';

export const GET_EMPLOYEE = gql`
  query Employee($id: ID) {
    employee(id: $id) {
      id
      email
      avatar
      firstName
      lastName
      position
    }
  }
`;

function EmployeePage({employeeId}) {
  console.log('employeeId', employeeId);
  return (
    <Query
      query={GET_EMPLOYEE}
      variables={{
        id: employeeId,
      }}
    >
      {({loading, error, data: {employee}}) => {
        if (loading) {
          return <PageLoader />;
        }
        if (error) {
          return <p>Error :(</p>;
        }
        if (!employee) {
          return <Prompt title="Employee not found" />;
        }

        return (
          <AppContainer topbar={null}>
            <Paper>
              <H4>
                Personal file
                <ActionsDropdown right employeeId={employeeId} />
              </H4>
              <div className={styles.detailsContainer}>
                <div className={styles.avatar}>
                  <Avatar medium src={employee.avatar} />
                </div>
                <div className={styles.info}>
                  <div>
                    {employee.firstName} {employee.lastName}
                  </div>
                  <div>{employee.position}</div>
                  <div>{employee.email}</div>
                </div>
              </div>
            </Paper>
          </AppContainer>
        );
      }}
    </Query>
  );
}
EmployeePage.propTypes = {
  employeeId: PropTypes.string.isRequired,
};

export default connect(
  (state, ownProps) => ({
    employeeId: ownProps.match.params.id,
  }),
  null
)(EmployeePage);
