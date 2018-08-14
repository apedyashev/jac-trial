import mongoose from 'mongoose';
import faker from 'faker';
import {makeExecutableSchema} from 'graphql-tools';
import {typeDef as Employee} from './Employee.js';

import 'models/Employee';
const EmployeeModel = mongoose.model('Employee');

const Query = `
  type Query {
    employees(page: Int, perPage: Int): EmployeesResponse
    employee(id: ID): Employee
  }
`;
const Mutation = `
  type Mutation {
    saveEmployee(id: ID, firstName: String, lastName: String, email: String, position: String): Employee
    deleteEmployee(id: ID): Employee
  }
`;

export default makeExecutableSchema({
  typeDefs: [Query, Mutation, Employee],
  resolvers: {
    Query: {
      employees(root, {page, perPage}) {
        return EmployeeModel.paginate({}, {page, limit: perPage, sort: {createdAt: -1}});
      },
      employee(root, {id}) {
        return EmployeeModel.findOne({_id: id});
      },
    },
    Mutation: {
      async saveEmployee(root, values) {
        let employee;
        console.log('values', values);
        if (values.id) {
          employee = await EmployeeModel.findOne({_id: values.id});
          console.log('employee', employee);
          if (employee) {
            employee.set(values);
            await employee.save();
          }
        } else {
          employee = new EmployeeModel({
            ...values,
            // NOTE: fake avatar for demo
            avatar: faker.image.avatar(),
          });
          await employee.save();
        }

        return employee;
      },
      async deleteEmployee(root, {id}) {
        const employee = await EmployeeModel.findOne({_id: id});
        if (employee) {
          await employee.remove();
          return employee;
        }
        return null;
      },
    },
  },
});
