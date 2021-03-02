import {FeedData} from "../../../db/schemas/feeds";
import {checkAuthorization} from "../../../utils/token";
import {ExpressContext, UserInputError} from "apollo-server-express";
import {createNewFeed, removeFeedByKey} from "../../../db/repos/feeds";
import {
    isValid,
    throwGeneralError,
    validateFeedsData
} from "../../../utils/validation";

const createFeed =
        async (_: unknown, {feed}: {feed: FeedData}, context: ExpressContext):
            Promise<FeedData | null |  void> => {
    const curUser = checkAuthorization(context)

    const errors = validateFeedsData(feed)

    if (!isValid(errors)) {
        throw new UserInputError('Incorrect input data', {errors})
    }

    const createdFeed =
        await createNewFeed(curUser.login, feed.timestamp, feed.details)
    if (!createdFeed) {
        return throwGeneralError(
            'Unexpected error occurred while creating the new feed item', {})
    } else {
        return createdFeed
    }
}

const removeFeed = async (_: unknown, {key}: {key: string}, context: ExpressContext):
    Promise<boolean | null | void> => {
    const curUser = checkAuthorization(context)
    const res = await removeFeedByKey(curUser.login, key);
    return res?.ok === 1 && res?.deletedCount === 1;
}

export const mutations = {
    createFeed,
    removeFeed,
}