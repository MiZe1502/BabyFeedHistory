import {gql} from "apollo-server-express";

export const typeDefs = gql`
    type Feed {
        key: String!
        timestamp: Float!
        details: [FeedDetails]!
    }
    
    type FeedDetails {
        key: String!
        type: String!
        name: String!
        amount: Int
        amountOfWhat: String
        wasGiven: Boolean
    }
    
    input FeedDetailsInput {
        key: String
        type: String!
        name: String!
        amount: Int
        amountOfWhat: String
        wasGiven: Boolean
    }

    input ExistedFeedDetailsInput {
        key: String!
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
        details: [FeedDetailsInput]
    }
    
    input ExistedFeedInput {
        key: String!
        timestamp: Float!
        details: [FeedDetailsInput] 
    }

    type Query {
        userByName(name: String!): User
        userByLogin(login: String!): User
        lastMonthFeeds(year: Int!, month: Int!): [Feed]
        getAvailableFeedDetails: [FeedDetails]
    }
    
    type Mutation {
        login(login: String!, password: String!): String
        register(user: UserInput!): User
        updateUser(user: UpdateUserInput): User
        createFeed(feed: FeedInput): Feed
        updateFeed(feed: ExistedFeedInput): Feed
        removeFeed(key: String!): Boolean
        createFeedDetails(feedDetails: FeedDetailsInput!): FeedDetails
        updateFeedDetails(feedDetails: ExistedFeedDetailsInput!): FeedDetails
        removeFeedDetails(key: String!): Boolean
    }

    type Subscription {
        feedCreated: Feed
    }
`;