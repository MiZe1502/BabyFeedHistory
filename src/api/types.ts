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
        name: String
        loc: String!
    }
    
    type RegisteredUser {
        login: String!
        name: String
        token: String!
        loc: String!
    }
    
    type LoggedInUser {
        token: String!
        loc: String!
    }

    input UserInput {
        login: String!
        password: String!
        confirmPassword: String!
        name: String
        loc: String!
    }
    
    input UpdateUserInput {
        login: String
        oldLogin: String
        oldPassword: String
        password: String
        confirmPassword: String
        name: String
        loc: String
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
        feedsForDay(from: Int!, to: Int!): [Feed]
        getAvailableFeedDetails: [FeedDetails]
    }
    
    type Mutation {
        login(login: String!, password: String!): LoggedInUser
        register(user: UserInput!): RegisteredUser
        updateUser(user: UpdateUserInput): User
        createFeed(feed: FeedInput): Feed
        updateFeed(feed: ExistedFeedInput): Feed
        removeFeed(key: String!): Feed
        createFeedDetails(feedDetails: FeedDetailsInput!): FeedDetails
        updateFeedDetails(feedDetails: ExistedFeedDetailsInput!): FeedDetails
        removeFeedDetails(key: String!): FeedDetails
    }

    type Subscription {
        feedCreated: Feed
        feedUpdated: Feed
        feedRemoved: Feed
        feedDetailsCreated: FeedDetails
        feedDetailsUpdated: FeedDetails
        feedDetailsRemoved: FeedDetails
    }
`;