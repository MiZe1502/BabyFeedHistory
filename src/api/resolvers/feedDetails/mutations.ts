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

        const res = await updateFeedDetailsItem(curUser.login, feedDetails)

        if (res && res.ok) {
            return feedDetails;
        } else {
            return throwGeneralError(
                'Unexpected error occurred while updating the feed details item',
                errors)
        }
    }

const removeFeedDetails =
    async (_: unknown, {key}: {key: string}, {token, pubsub}: Context):
        Promise<boolean | null | void> => {
    const curUser = checkAuthorization(token)
    const res = await removeFeedDetailsItem(curUser.login, key);
    return res?.ok === 1 && res?.deletedCount === 1;

}

export const mutations = {
    createFeedDetails,
    updateFeedDetails,
    removeFeedDetails,
}