import {FeedData} from "../schemas/feeds";
import {feedModel} from "../models/feeds";
import { v4 as uuidv4 } from 'uuid';
import {QueryResult} from "../../utils/types";
import {FeedDetailsData} from "../schemas/feedDetails";

export const getFeedsForLastMonth =
        async (userLogin: string, year: number, month: number):
            Promise<FeedData[] | null> => {
    //TODO: implement validation

    const firstDayOfMonth = new Date(year, month, 1).getTime();

    const yearForSearch = month === 12 ? year + 1 : year
    const monthForSearch = month === 12 ? 1 : month + 1
    const lastDayOfMonth = new Date(yearForSearch, monthForSearch, 0).getTime();

    return feedModel.find({
        $and: [
            { timestamp: { $gte : firstDayOfMonth } },
            { timestamp: { $lte : lastDayOfMonth } },
            {createdBy: userLogin}
        ]
    })
}

export const createNewFeed =
        async (userLogin: string, timestamp: number, details: FeedDetailsData[]):
            Promise<FeedData | null> => {
    const key = uuidv4();
    const newFeedItem: FeedData = {
        key,
        timestamp,
        createdBy: userLogin,
        details: details || [],
    }
    return feedModel.create(newFeedItem)
}

// export const updateFeed =
//         async (newFeedData: FeedData): QueryResult => {
//     return feedModel.updateOne({key: newFeedData.key}, newFeedData);
// }
//
// export const removeFeed = async (key: string): QueryResult => {
//     return feedModel.remove({key})
// }