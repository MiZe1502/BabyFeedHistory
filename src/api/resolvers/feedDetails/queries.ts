import {ExpressContext} from "apollo-server-express";
import {FeedDetailsData} from "../../../db/schemas/feedDetails";
import {checkAuthorization} from "../../../utils/token";
import {getAvailableFeedDetailsForUser} from "../../../db/repos/feedDetails";

const getAvailableFeedDetails =
    async (_: unknown, __: unknown, context: ExpressContext):
        Promise<FeedDetailsData[] | null> => {
        const curUser = checkAuthorization(context)

        return getAvailableFeedDetailsForUser(curUser.login);
    }

export const queries = {
    getAvailableFeedDetails,
}