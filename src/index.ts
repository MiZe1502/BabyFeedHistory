import express from "express";
import { ApolloServer, gql } from 'apollo-server-express';

const port = 3000;
const hostname = 'localhost'

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