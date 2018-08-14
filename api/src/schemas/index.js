import mongoose from 'mongoose';
import {makeExecutableSchema} from 'graphql-tools';
import {typeDef as Employee} from './Employee.js';

import 'models/Employee';
const EmployeeModel = mongoose.model('Employee');

const Query = `
  type Query {
    employees(page: Int, perPage: Int): EmployeesResponse
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
      employees: (root, {page, perPage}) => {
        return EmployeeModel.paginate({}, {page, limit: perPage});
      },
    },
  },
});
