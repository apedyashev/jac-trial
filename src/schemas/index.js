import {makeExecutableSchema} from 'graphql-tools';
import {typeDef as Employee} from './Employee.js';

const Query = `
  type Query {
    employees: [Employee]
  }
`;
const Mutation = `
  type Mutation {
    addEmployee(title: String, author: String): Employee
  }
`;

export default makeExecutableSchema({
  typeDefs: [Query, Mutation, Employee],
  resolvers: {
    Query: {
      employees: () => [
        {
          email: 'u@example.com',
          firstName: 'alexey',
          lastName: 'pedyashev',
          avatar:
            'https://scontent-frt3-1.xx.fbcdn.net/v/t1.0-1/p320x320/30582249_10216360924644473_137144606478303232_n.jpg?_nc_cat=0&oh=3b642f62415099a59a834d0ef16f1a39&oe=5C0CAE78',
        },
      ],
    },
  },
});
