import {gql} from "apollo-server-express";

export const typeDefs = gql`
    type User {
        login: String!
        password: String
        name: String
        token: String
    }

    input UserInput {
        login: String!
        password: String!
        confirmPassword: String!
        name: String
    }
    
    input UpdateUserInput {
        login: String
        oldLogin: String
        password: String
        confirmPassword: String
        name: String
    }

    type Query {
        userByName(name: String!): User
        userByLogin(login: String!): User
    }
    
    type Mutation {
        login(login: String!, password: String!): String
        register(user: UserInput!): User
        updateUser(user: UpdateUserInput): User
    }
`;