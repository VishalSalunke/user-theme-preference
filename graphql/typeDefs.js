// third party dependacies
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    email: String
    password: String
    fullName: String
    token: String
    theme: String
  }

  input RegisterInput {
    email: String
    password: String
    fullName: String
  }

  input LoginInput {
    email: String
    password: String
  }

  input ThemeInput {
    theme: String
    email: String
  }

  type Query {
    user(id: ID!): User
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    updateUserTheme(themeInput: ThemeInput): User
  }
`;

module.exports = typeDefs;
