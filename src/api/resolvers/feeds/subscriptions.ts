import {Context} from "../../../utils/types";

export const FEED_CREATED_KEY = "FEED_CREATED";

const feedCreated = {
    subscribe: (_: unknown, __: unknown, context: Context) =>
        context.pubsub.asyncIterator([FEED_CREATED_KEY])
}

export const subscriptions = {
    feedCreated,
}