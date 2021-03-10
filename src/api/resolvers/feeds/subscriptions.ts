import { withFilter } from "apollo-server-express";
import {FeedData} from "../../../db/schemas/feeds";
import {
    checkSubscriptionOwner,
    getSubscribeIterator
} from "../../../utils/subscriptions";

export const FEED_CREATED_KEY = "FEED_CREATED";
export const FEED_UPDATED_KEY = "FEED_UPDATED";
export const FEED_REMOVED_KEY = "FEED_REMOVED";

const feedCreated = {
    subscribe: withFilter(
        getSubscribeIterator(FEED_CREATED_KEY),
        (payload: {feedCreated: FeedData}, _, {token}) =>
            checkSubscriptionOwner(token, payload.feedCreated.createdBy),
    ),
}

const feedUpdated = {
    subscribe: withFilter(
        getSubscribeIterator(FEED_UPDATED_KEY),
        (payload: {feedUpdated: FeedData}, _, {token}) => {
            return checkSubscriptionOwner(token, payload.feedUpdated.createdBy)
        }
    ),
}

const feedRemoved = {
    subscribe: withFilter(
        getSubscribeIterator(FEED_REMOVED_KEY),
        (payload: {feedRemoved: FeedData}, _, {token}) => {
            return checkSubscriptionOwner(token, payload.feedRemoved.createdBy)
        }
    ),
}

export const subscriptions = {
    feedCreated,
    feedUpdated,
    feedRemoved,
}