import express, {json} from "express";
import { ApolloServer } from 'apollo-server-express';
import { getCurrentConfig } from './configuration'
import { connectToDb } from "./db";
import {typeDefs} from "./api/types";
import {resolvers} from "./api/resolvers";
import helmet from "helmet/dist";
import depthLimit from "graphql-depth-limit";

const config = getCurrentConfig();


const {port, hostname, db, maxRequestSize, gqlDepthLimit} = config;

(async function () {
    try {
        await connectToDb(db)
        console.log('db connected successfully')
    } catch (err) {
        console.log(`error connecting to db: ${err}`)
    }
})()

const server = new ApolloServer({typeDefs,
    validationRules: [ depthLimit(gqlDepthLimit) ],
    resolvers,
    context: ({req}) => ({req})});

const app = express();

app.use(helmet())
app.use(json({ limit: maxRequestSize }));

server.applyMiddleware({ app });

app.listen(port, hostname, () =>
    console.log(`Server is running at ${hostname}:${port}${server.graphqlPath}`)
);

