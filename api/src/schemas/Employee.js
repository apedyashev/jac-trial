export const typeDef = `
  type Employee {
    id: ID
    email: String
    firstName: String
    lastName: String
    position: String
    avatar: String
  }

  type EmployeesResponse {
    docs: [Employee]
    page: Int
    limit: Int
    pages: Int
  }
`;
