// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {GET_EMPLOYEE} from 'containers/screens/Dashboard/EmployeePage';
// components
import {Query} from 'react-apollo';
import {PageLoader} from 'components/ui';
import EmployeeEditForm from './components/Form';

function EmployeeEditPage({employeeId}) {
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

        return <EmployeeEditForm initialValues={employee} />;
      }}
    </Query>
  );
}
EmployeeEditPage.propTypes = {};

export default connect(
  (state, ownProps) => ({
    employeeId: ownProps.match.params.id,
  }),
  null
)(EmployeeEditPage);