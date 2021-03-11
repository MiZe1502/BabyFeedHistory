import { withFilter } from "apollo-server-express";
import {
    checkSubscriptionOwner,
    getSubscribeIterator
} from "../../../utils/subscriptions";
import {FeedDetailsData} from "../../../db/schemas/feedDetails";

export const FEED_DETAILS_CREATED_KEY = "FEED_DETAILS_CREATED";
export const FEED_DETAILS_UPDATED_KEY = "FEED_DETAILS_UPDATED";
export const FEED_DETAILS_REMOVED_KEY = "FEED_DETAILS_REMOVED";

const feedDetailsCreated = {
    subscribe: withFilter(
        getSubscribeIterator(FEED_DETAILS_CREATED_KEY),
        (payload: {feedDetailsCreated: FeedDetailsData}, _, {token}) =>
            checkSubscriptionOwner(token, payload.feedDetailsCreated.createdBy),
    ),
}

const feedDetailsUpdated = {
    subscribe: withFilter(
        getSubscribeIterator(FEED_DETAILS_UPDATED_KEY),
        (payload: {feedDetailsUpdated: FeedDetailsData}, _, {token}) => {
            return checkSubscriptionOwner(token, payload.feedDetailsUpdated.createdBy)
        }
    ),
}

const feedDetailsRemoved = {
    subscribe: withFilter(
        getSubscribeIterator(FEED_DETAILS_REMOVED_KEY),
        (payload: {feedDetailsRemoved: FeedDetailsData}, _, {token}) => {
            return checkSubscriptionOwner(token, payload.feedDetailsRemoved.createdBy)
        }
    ),
}

export const subscriptions = {
    feedDetailsCreated,
    feedDetailsUpdated,
    feedDetailsRemoved,
}