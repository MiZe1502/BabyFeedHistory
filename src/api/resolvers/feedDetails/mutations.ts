import {FeedDetailsData} from "../../../db/schemas/feedDetails";
import {UserInputError} from "apollo-server-express";
import {checkAuthorization} from "../../../utils/token";
import {
    isValid,
    throwGeneralError,
    validateFeedDetails
} from "../../../utils/validation";
import {
    createNewFeedDetails, removeFeedDetailsItem,
    updateFeedDetailsItem
} from "../../../db/repos/feedDetails";
import {Context} from "../../../utils/types";
import {
    FEED_DETAILS_CREATED_KEY, FEED_DETAILS_REMOVED_KEY,
    FEED_DETAILS_UPDATED_KEY
} from "./subscriptions";

const createFeedDetails =
    async (_: unknown, {feedDetails}: {feedDetails: FeedDetailsData},
           {token, pubsub}: Context): Promise<FeedDetailsData | null | void> => {
    const curUser = checkAuthorization(token)

    const errors = validateFeedDetails(feedDetails)

    if (!isValid(errors)) {
        throw new UserInputError('Incorrect input data', {errors})
    }

    const createdFeedDetails = await createNewFeedDetails(curUser.login, feedDetails)
    if (!createdFeedDetails) {
        return throwGeneralError(
            'Unexpected error occurred while creating the new feed details item',
            errors)
    } else {
        await pubsub.publish(FEED_DETAILS_CREATED_KEY,
            { feedDetailsCreated: createdFeedDetails });
        return createdFeedDetails
    }
}

const updateFeedDetails =
    async (_: unknown, {feedDetails}: {feedDetails: FeedDetailsData},
           {token, pubsub}: Context): Promise<FeedDetailsData | null | void> => {
        const curUser = checkAuthorization(token)

        const errors = validateFeedDetails(feedDetails)

        if (!isValid(errors)) {
            throw new UserInputError('Incorrect input data', {errors})
        }

        const updatedFeedDetails =
            await updateFeedDetailsItem(curUser.login, feedDetails)

        if (updatedFeedDetails) {
            await pubsub.publish(FEED_DETAILS_UPDATED_KEY,
                { feedDetailsUpdated: updatedFeedDetails });
            return updatedFeedDetails;
        } else {
            return throwGeneralError(
                'Unexpected error occurred while updating the feed details item',
                errors)
        }
    }

const removeFeedDetails =
    async (_: unknown, {key}: {key: string}, {token, pubsub}: Context):
        Promise<FeedDetailsData | null | void> => {
    const curUser = checkAuthorization(token)
    const removedFeedDetails = await removeFeedDetailsItem(curUser.login, key);

    if (removedFeedDetails) {
        await pubsub.publish(FEED_DETAILS_REMOVED_KEY,
            { feedDetailsRemoved: removedFeedDetails });
        return removedFeedDetails
    } else {
        return throwGeneralError(
            'Unexpected error occurred while removing the feed details item', {})
    }
}

export const mutations = {
    createFeedDetails,
    updateFeedDetails,
    removeFeedDetails,
}