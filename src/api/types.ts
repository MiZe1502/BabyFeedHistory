import {gql} from "apollo-server-express";

export const typeDefs = gql`
    type Feed {
        key: String!
        timestamp: Float!
        details: [FeedDetails]!
    }
    
    type FeedDetails {
        type: String!
        name: String!
        amount: Int
        amountOfWhat: String
        wasGiven: Boolean
    }
    
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
    
    input FeedInput {
        timestamp: Float!
    }

    type Query {
        userByName(name: String!): User
        userByLogin(login: String!): User
        lastMonthFeeds(year: Int!, month: Int!): [Feed]
    }
    
    type Mutation {
        login(login: String!, password: String!): String
        register(user: UserInput!): User
        updateUser(user: UpdateUserInput): User
        createFeed(feed: FeedInput): Feed
    }
`;