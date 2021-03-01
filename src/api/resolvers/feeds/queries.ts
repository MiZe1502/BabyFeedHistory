import {FeedData} from "../../../db/schemas/feeds";
import {checkAuthorization} from "../../../utils/token";
import {ExpressContext} from "apollo-server-express";
import {getFeedsForLastMonth} from "../../../db/repos/feeds";

const lastMonthFeeds =
        async (_: unknown,
               data: { year: number, month: number }, context: ExpressContext):
                Promise<FeedData[] | null> => {
    const curUser = checkAuthorization(context)

    //TODO: implement month validation

    return getFeedsForLastMonth(curUser.login, data.year, data.month);
}

export const queries = {
    lastMonthFeeds,
}