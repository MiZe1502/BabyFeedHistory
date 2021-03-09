import {ExpressContext, PubSub} from "apollo-server-express";

export type QueryResult = Promise<{ok:number, deletedCount?: number} | null>

export interface Context extends ExpressContext {
    pubsub: PubSub
}