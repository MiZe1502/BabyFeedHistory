import express from "express";
import { ApolloServer, gql } from 'apollo-server-express';
import {getCurrentConfig} from './configuration'
import {connectToDb} from "./db";

const config = getCurrentConfig();

const port = config.port;
const hostname = config.hostname;
const dbConnectionString = config.db;

(async function () {
    try {
        await connectToDb(dbConnectionString)
        console.log('db connected successfully')
    } catch (err) {
        console.log(`error connecting to db: ${err}`)
    }
})()

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
};

const server = new ApolloServer({typeDefs, resolvers});

const app = express();

server.applyMiddleware({ app });

app.listen(port, hostname, () =>
    console.log(`Server is running at ${hostname}:${port}${server.graphqlPath}`)
);

