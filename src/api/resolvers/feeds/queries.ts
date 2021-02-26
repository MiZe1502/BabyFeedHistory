import {FeedData} from "../../../db/schemas/feeds";
import {checkAuthorization} from "../../../utils/token";
import {ExpressContext} from "apollo-server-express";
import {getFeedsForLastMonth} from "../../../db/repos/feeds";

const lastMonthFeeds =
        async (_: unknown, data: unknown, context: ExpressContext):
            Promise<FeedData[] | null> => {
    const curUser = checkAuthorization(context)

    return getFeedsForLastMonth(curUser.login);
}

export const queries = {
    lastMonthFeeds,
}