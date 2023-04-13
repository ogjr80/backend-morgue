const { gql } = require('apollo-server');

const typeDefs = gql`
type Contact {
    id: ID!
    firstName: String!
    lastName: String!
    middleName: String
    age: Int!
    gender: Gender!
  }
  
  enum Gender {
    MALE
    FEMALE
    OTHER
  }
  
  type Query {
    getContact(id: ID!): Contact
    getAllContacts: [Contact!]!
  }
  
  type Mutation {
    createContact(input: ContactInput!): Contact!
    updateContact(id: ID!, input: ContactInput!): Contact!
    deleteContact(id: ID!): ID!
  }
  
  input ContactInput {
    firstName: String!
    lastName: String!
    middleName: String
    age: Int!
    gender: Gender!
  }
  
  schema {
    query: Query
    mutation: Mutation
  }
  
`

module.exports = typeDefs; 
