import {FeedData} from "../../../db/schemas/feeds";
import {checkAuthorization} from "../../../utils/token";
import {UserInputError} from "apollo-server-express";
import {
    createNewFeed,
    removeFeedByKey,
    updateFeedItem
} from "../../../db/repos/feeds";
import {
    isValid,
    throwGeneralError,
    validateFeedsData
} from "../../../utils/validation";
import {
    FEED_CREATED_KEY,
    FEED_REMOVED_KEY,
    FEED_UPDATED_KEY
} from "./subscriptions";
import {Context} from "../../../utils/types";

const createFeed =
        async (_: unknown, {feed}: {feed: FeedData}, {token, pubsub}: Context):
            Promise<FeedData | null |  void> => {
    const curUser = checkAuthorization(token)

    const errors = validateFeedsData(feed)

    if (!isValid(errors)) {
        throw new UserInputError('Incorrect input data', {errors})
    }

    const createdFeed =
        await createNewFeed(curUser.login, feed.timestamp, feed.details)
    if (!createdFeed) {
        return throwGeneralError(
            'Unexpected error occurred while creating the new feed item', errors)
    } else {
        await pubsub.publish(FEED_CREATED_KEY, { feedCreated: createdFeed });
        return createdFeed
    }
}

const updateFeed =
    async (_: unknown, {feed}: {feed: FeedData}, {token, pubsub}: Context):
        Promise<FeedData | null | void> => {
        const curUser = checkAuthorization(token)

        const errors = validateFeedsData(feed)

        if (!isValid(errors)) {
            throw new UserInputError('Incorrect input data', {errors})
        }

        const res = await updateFeedItem(curUser.login, feed)

        if (res && res.ok) {
            await pubsub.publish(FEED_UPDATED_KEY, { feedUpdated: feed });
            return feed;
        } else {
            return throwGeneralError(
                'Unexpected error occurred while updating the feed item', errors)
        }
    }

const removeFeed = async (_: unknown, {key}: {key: string}, {token, pubsub}: Context):
    Promise<boolean | null | void> => {
    const curUser = checkAuthorization(token)
    const res = await removeFeedByKey(curUser.login, key);

    const result = res?.ok === 1 && res?.deletedCount === 1
    if (result) {
        await pubsub.publish(FEED_REMOVED_KEY, { feedRemoved: key });
    }

    return result;
}

export const mutations = {
    createFeed,
    updateFeed,
    removeFeed,
}