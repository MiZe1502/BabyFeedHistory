import {FeedData} from "../../../db/schemas/feeds";
import {checkAuthorization} from "../../../utils/token";
import {UserInputError} from "apollo-server-express";
import {getFeedsForDay, getFeedsForLastMonth} from "../../../db/repos/feeds";
import {
    isValid,
    validateQueryDayFeedsData,
    validateQueryFeedsData
} from "../../../utils/validation";
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

const feedsForDay =
    async (_: unknown, data: {from: number, to: number }, {token}: Context):
        Promise<FeedData[] | null> => {
        const from = data.from * 1000;
        const to = data.to * 1000;

        const curUser = checkAuthorization(token)

        const errors = validateQueryDayFeedsData(from ,to)

        if (!isValid(errors)) {
            throw new UserInputError('Incorrect query data for day time interval', {errors})
        }

        return getFeedsForDay(curUser.login, from ,to);

    }

export const queries = {
    lastMonthFeeds,
    feedsForDay,
}