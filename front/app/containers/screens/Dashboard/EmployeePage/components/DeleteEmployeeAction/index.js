// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Redirect} from 'react-router';
import {Mutation} from 'react-apollo';
import {Dropdown} from 'semantic-ui-react';
import {DELETE_EMPLOYEE, GET_EMPLOYEES, PER_PAGE} from 'graphql/Employee';

export default function DeleteEmployeeAction({employeeId}) {
  console.log('DELETE_EMPLOYEE', DELETE_EMPLOYEE);
  return (
    <Mutation
      mutation={DELETE_EMPLOYEE}
      update={(cache, {data: {deleteEmployee}}) => {
        try {
          const {employees} = cache.readQuery({
            query: GET_EMPLOYEES,
            variables: {page: 1, perPage: PER_PAGE},
          });
          console.log('employees', employees);
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
      {(deleteEmployee, {loading, data}) => {
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
DeleteEmployeeAction.propTypes = {
  employeeId: PropTypes.string.isRequired,
};
