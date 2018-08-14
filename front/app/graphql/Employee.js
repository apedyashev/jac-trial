import gql from 'graphql-tag';
export const SAVE_EMPLOYEE = gql`
  mutation SaveEmployee(
    $id: ID
    $firstName: String
    $lastName: String
    $email: String
    $position: String
  ) {
    saveEmployee(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      position: $position
    ) {
      id
      email
      avatar
      firstName
      lastName
      position
    }
  }
`;

export const PER_PAGE = 25;
export const GET_EMPLOYEES = gql`
  query Employees($page: Int, $perPage: Int) {
    employees(page: $page, perPage: $perPage) {
      docs {
        id
        email
        avatar
        firstName
        lastName
        position
      }
      page
      pages
    }
  }
`;

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

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID) {
    deleteEmployee(id: $id) {
      id
    }
  }
`;
