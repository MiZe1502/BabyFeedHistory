import express from "express";
import { ApolloServer, gql } from 'apollo-server-express';
import {getCurrentConfig} from './configuration'

const config = getCurrentConfig();
const port = config.port;
const hostname = config.hostname;

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