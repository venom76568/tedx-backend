const { gql } = require("graphql-tag");

const typeDefs = gql`
  input FormInput {
    name: String!
    email: String!
    phone: String!
    affiliation: String!
    college: String
    id_type: String!
  }

  type Form {
    id: ID!
    name: String!
    email: String!
    phone: String!
    affiliation: String!
    college: String
    id_type: String!
  }

  type Response {
    code: Int!
    message: String!
    data: Form
  }

  type Query {
    getForms: [Form!]!
  }

  type Mutation {
    createForm(createFormInput: FormInput!): Response!
  }
`;

module.exports = typeDefs;
