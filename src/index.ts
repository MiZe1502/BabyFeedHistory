const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const port = 3000;
const host = 'http://localhost'

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

app.listen({ port }, () =>
    console.log(`Server is running at ${host}:${port}${server.graphqlPath}`)
);