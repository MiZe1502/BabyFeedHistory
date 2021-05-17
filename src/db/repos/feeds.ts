import {FeedData} from "../schemas/feeds";
import {feedModel} from "../models/feeds";
import { v4 as uuidv4 } from 'uuid';
import {FeedDetailsData} from "../schemas/feedDetails";

export const getFeedsForLastMonth =
        async (userLogin: string, year: number, month: number):
            Promise<FeedData[] | null> => {
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

export const getFeedsForDay =
    async (userLogin: string, from: number, to: number):
    Promise<FeedData[] | null> => {
        return feedModel.find({
            $and: [
                { timestamp: { $gte : from } },
                { timestamp: { $lte : to } },
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

export const updateFeedItem =
        async (userLogin: string, newFeedData: FeedData):
            Promise<FeedData | null> => {
    return feedModel.findOneAndUpdate({
        $and: [
            { key: newFeedData.key },
            { createdBy: userLogin }
        ]
        }, newFeedData, {new: true});
}

export const changeFeedItemsOwner =
    async (oldLogin: string, userLogin: string): Promise<FeedData[] | null> => {
        return feedModel.updateMany({
            createdBy: oldLogin
        }, {
            createdBy: userLogin,
        }, { multi: true, upsert: true })
    }

export const removeFeedByKey =
    async (userLogin: string, key: string): Promise<FeedData | null> => {
    return feedModel.findOneAndRemove({
        $and: [
            { key: key },
            { createdBy: userLogin }
        ]
    }, {new: true})
}