import {FeedData} from "../../../db/schemas/feeds";
import {checkAuthorization} from "../../../utils/token";
import {ExpressContext} from "apollo-server-express";
import {createNewFeed} from "../../../db/repos/feeds";
import {throwGeneralError} from "../../../utils/validation";

const createFeed =
        async (_: unknown, data: unknown, context: ExpressContext):
            Promise<FeedData | null |  void> => {
    const curUser = checkAuthorization(context)

    const createdFeed = await createNewFeed(curUser.login)
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