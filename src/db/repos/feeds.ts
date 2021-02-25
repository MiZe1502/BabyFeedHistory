import {FeedData} from "../schemas/feeds";
import {feedModel} from "../models/feeds";
import {QueryResult} from "../../utils/types";

export const getFeedsForLastMonth =
        async (userLogin: string): Promise<FeedData[] | null> => {
    const curDate = new Date();
    const curYear = curDate.getFullYear()
    const curMonth = curDate.getMonth();
    const firstDayOfCurMonth = new Date(curYear, curMonth, 1).getTime();

    return feedModel.find({
        timestamp: {$gte: firstDayOfCurMonth},
        createdBy: userLogin
    })
}

export const createNewFeed = async (userLogin: string): Promise<FeedData | null> => {
    const curDate = new Date();
    const key = `${curDate.getFullYear()}-${curDate.getMonth() + 1}`
    const newFeedItem: FeedData = {
        key,
        timestamp: curDate.getTime(),
        createdBy: userLogin,
    }
    return feedModel.create(newFeedItem)
}

export const updateFeed =
        async (newFeedData: FeedData): QueryResult => {
    return feedModel.updateOne({key: newFeedData.key}, newFeedData);
}

export const removeFeed = async (key: string): QueryResult => {
    return feedModel.remove({key})
}