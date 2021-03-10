import {FeedData} from "../../../db/schemas/feeds";
import {checkAuthorization} from "../../../utils/token";
import {UserInputError} from "apollo-server-express";
import {getFeedsForLastMonth} from "../../../db/repos/feeds";
import {isValid, validateQueryFeedsData} from "../../../utils/validation";
import {Context} from "../../../utils/types";

const lastMonthFeeds =
        async (_: unknown,
               data: { year: number, month: number }, {token}: Context):
                Promise<FeedData[] | null> => {
    const {year, month} = data;
    const curUser = checkAuthorization(token)

    const errors = validateQueryFeedsData(year, month)

    if (!isValid(errors)) {
        throw new UserInputError('Incorrect query data for month or year', {errors})
    }

    return getFeedsForLastMonth(curUser.login, year, month);
}

export const queries = {
    lastMonthFeeds,
}