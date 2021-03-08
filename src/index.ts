import express, {json} from "express";
import { ApolloServer, PubSub } from 'apollo-server-express';
import { getCurrentConfig } from './configuration'
import { connectToDb } from "./db";
import {typeDefs} from "./api/types";
import {resolvers} from "./api/resolvers";
import helmet from "helmet/dist";
import depthLimit from "graphql-depth-limit";
import cors from "cors";

const config = getCurrentConfig();

const {
    port,
    hostname,
    db,
    maxRequestSize,
    gqlDepthLimit,
    corsOrigin,
    corsHeaders,
    corsMethods} = config;

const corsOptions = {
    origin: corsOrigin,
    methods: corsMethods,
    allowedHeaders: corsHeaders
};

(async function () {
    try {
        await connectToDb(db)
        console.log('db connected successfully')
    } catch (err) {
        console.log(`error connecting to db: ${err}`)
    }
})()

const server = new ApolloServer({typeDefs,
    subscriptions: {
        path: '/subscriptions'
    },
    validationRules: [ depthLimit(gqlDepthLimit) ],
    resolvers,
    context: ({req}) => {
        const pubsub = new PubSub();
        return {req, pubsub}
    }
});

const app = express();

app.use(helmet())
app.use(json({ limit: maxRequestSize }));
app.use(cors(corsOptions));

server.applyMiddleware({ app });

app.listen(port, hostname, () =>
    console.log(`Server is running at ${hostname}:${port}${server.graphqlPath}`)
);

