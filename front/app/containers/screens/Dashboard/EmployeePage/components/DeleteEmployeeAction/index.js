// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import gql from 'graphql-tag';
// components
import {Redirect} from 'react-router';
import {Mutation} from 'react-apollo';
import {Button} from 'components/ui';
import {Dropdown} from 'semantic-ui-react';
import {
  GET_EMPLOYEES,
  PER_PAGE,
} from 'containers/screens/Dashboard/EmployeesPage/components/EmployeesList';

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID) {
    deleteEmployee(id: $id) {
      id
    }
  }
`;

export default function DeleteEmployeeAction({employeeId}) {
  return (
    <Mutation
      mutation={DELETE_EMPLOYEE}
      update={(cache, {data: {deleteEmployee}}) => {
        try {
          const {employees} = cache.readQuery({
            query: GET_EMPLOYEES,
            variables: {page: 1, perPage: PER_PAGE},
          });
          cache.writeQuery({
            query: GET_EMPLOYEES,
            variables: {page: 1, perPage: PER_PAGE},
            data: {
              employees: {
                ...employees,
                docs: employees.docs.filter((doc) => doc.id !== deleteEmployee.id), // [...employees.docs, ...deletedEmployee],
              },
            },
          });
        } catch (e) {
          // error is trown only if employees list hasn't been loaded (for example) if
          // page is refreshed. But it's OK, we can ignore it
          console.log(e);
        }
      }}
    >
      {(deleteEmployee, {loading, error, data}) => {
        console.log('data', data);
        if (data && data.deleteEmployee && data.deleteEmployee.id) {
          return <Redirect to="/employees" />;
        }

        return (
          <Dropdown.Item
            loading={loading}
            onClick={() => {
              deleteEmployee({variables: {id: employeeId}});
            }}
          >
            Delete
          </Dropdown.Item>
        );
      }}
    </Mutation>
  );
}
DeleteEmployeeAction.propTypes = {};
