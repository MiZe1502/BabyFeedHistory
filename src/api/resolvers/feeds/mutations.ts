import {FeedData} from "../../../db/schemas/feeds";
import {checkAuthorization} from "../../../utils/token";
import {ExpressContext, UserInputError} from "apollo-server-express";
import {createNewFeed} from "../../../db/repos/feeds";
import {throwGeneralError} from "../../../utils/validation";

const createFeed =
        async (_: unknown, {feed}: {feed: FeedData}, context: ExpressContext):
            Promise<FeedData | null |  void> => {
    const curUser = checkAuthorization(context)

    //TODO: Validate input data

    if (!feed.timestamp) {
        throw new UserInputError('Incorrect feed item data', {})
    }

    const createdFeed = await createNewFeed(curUser.login, feed.timestamp)
    if (!createdFeed) {
        return throwGeneralError(
            'Unexpected error occurred while creating the new feed item', {})
    } else {
        return createdFeed
    }
}

export const mutations = {
    createFeed,
}