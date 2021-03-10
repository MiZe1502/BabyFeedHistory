import {PubSub} from "apollo-server-express";

export type QueryResult = Promise<{ok:number, deletedCount?: number} | null>

export interface Context {
    pubsub: PubSub,
    token: string,
}