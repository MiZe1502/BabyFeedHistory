import { withFilter } from "apollo-server-express";
import {Context} from "../../../utils/types";
import {FeedData} from "../../../db/schemas/feeds";
import {checkAuthorization} from "../../../utils/token";

export const FEED_CREATED_KEY = "FEED_CREATED";
export const FEED_UPDATED_KEY = "FEED_UPDATED";
export const FEED_REMOVED_KEY = "FEED_REMOVED";

const feedCreated = {
    subscribe: withFilter(
        (_: unknown, __: unknown, {pubsub}: Context) =>
            pubsub.asyncIterator([FEED_CREATED_KEY]),
        (payload: {feedCreated: FeedData}, _, {token}) => {
            const curUser = checkAuthorization(token)
            return curUser.login === payload.feedCreated.createdBy;
        },
    ),
}

const feedUpdated = {
    subscribe: (_: unknown, __: unknown, {pubsub}: Context) =>
        pubsub.asyncIterator([FEED_UPDATED_KEY])
}

const feedRemoved = {
    subscribe: (_: unknown, __: unknown, {pubsub}: Context) =>
        pubsub.asyncIterator([FEED_REMOVED_KEY])
}

export const subscriptions = {
    feedCreated,
    feedUpdated,
    feedRemoved,
}