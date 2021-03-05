import {FeedDetailsData} from "../../../db/schemas/feedDetails";
import {ExpressContext, UserInputError} from "apollo-server-express";
import {checkAuthorization} from "../../../utils/token";
import {
    isValid,
    throwGeneralError,
    validateFeedDetails
} from "../../../utils/validation";
import {createNewFeedDetails} from "../../../db/repos/feedDetails";

const createFeedDetails =
    async (_: unknown, {feedDetails}: {feedDetails: FeedDetailsData},
           context: ExpressContext): Promise<FeedDetailsData | null | void> => {
    const curUser = checkAuthorization(context)

    const errors = validateFeedDetails(feedDetails)

    if (!isValid(errors)) {
        throw new UserInputError('Incorrect input data', {errors})
    }

    const createdFeedDetails = await createNewFeedDetails(curUser.login, feedDetails)
    if (!createdFeedDetails) {
        return throwGeneralError(
            'Unexpected error occurred while creating the new feed item', errors)
    } else {
        return createdFeedDetails
    }
}

export const mutations = {
    createFeedDetails
}