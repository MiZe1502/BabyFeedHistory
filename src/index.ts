import express, {json} from "express";
import {ApolloServer, PubSub} from 'apollo-server-express';
import { getCurrentConfig } from './configuration'
import { connectToDb } from "./db";
import {typeDefs} from "./api/types";
import {resolvers} from "./api/resolvers";
import helmet from "helmet/dist";
import depthLimit from "graphql-depth-limit";
import cors from "cors";
import * as http from "http";

const config = getCurrentConfig();

const {
    port,
    hostname,
    db,
    maxRequestSize,
    gqlDepthLimit,
    corsOrigin,
    corsHeaders,
    corsMethods,
    useHelmet} = config;

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

const pubsub = new PubSub();

const server = new ApolloServer({typeDefs,
    validationRules: [ depthLimit(gqlDepthLimit) ],
    resolvers,
    context: ({ req, connection }) => {
        if (connection) { // Operation is a Subscription
            const token = connection.context.authorization || '';
            return { token, pubsub };
        } else {
            return {token: req.headers.authorization || '', pubsub}
        }
    },
    subscriptions: {
        path: "/subscriptions",
        onConnect: (connectionParams: Record<string, any>) => {
            console.log('Client connected')
            return connectionParams // pass headers to connection context
        },
        onDisconnect: () => console.log('Client disconnected'),
    },
});

const app = express();
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

useHelmet && app.use(helmet())
app.use(json({ limit: maxRequestSize }));
app.use(cors(corsOptions));

server.applyMiddleware({ app });

httpServer.listen(port, hostname, () => {
    console.log(`Server is running at ${hostname}:${port}${server.graphqlPath}`)
    // eslint-disable-next-line max-len
    console.log(`Subscriptions are running at ws://${hostname}:${port}${server.subscriptionsPath}`)
});

