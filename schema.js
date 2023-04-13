// schema.js
const { gql } = require('apollo-server');

const typeDefs = gql`
  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    age: Int!
  }

  type Query {
    hello: String
    getEmployee(id: ID!): Employee
    getEmployees: [Employee]
  }

  type Mutation {
    addEmployee(firstName: String!, lastName: String!, email: String!, age: Int!): Employee
  }
`;

module.exports = typeDefs;
