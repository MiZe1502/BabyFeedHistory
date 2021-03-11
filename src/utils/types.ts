import {PubSub} from "apollo-server-express";

export interface Context {
    pubsub: PubSub,
    token: string,
}