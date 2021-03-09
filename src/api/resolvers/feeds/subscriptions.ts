import {Context} from "../../../utils/types";


export const FEED_CREATED_KEY = "FEED_CREATED";

const feedCreated = (_: unknown, __: unknown, context: Context) => {
    return {
        subscribe: () => context.pubsub.asyncIterator([FEED_CREATED_KEY])
    }
}

export const subscriptions = {
    feedCreated,
}