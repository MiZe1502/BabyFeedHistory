import {FeedDetailsData} from "../schemas/feedDetails";
import {feedDetailsModel} from "../models/feedDetails";

export const getAvailableFeedDetails = async (userLogin: string):
    Promise<FeedDetailsData[] | null> => feedDetailsModel.find({createdBy: userLogin})

export const createNewFeedDetails =
    async (userLogin: string, feedDetailsItem: FeedDetailsData):
        Promise<FeedDetailsData | null> =>
        feedDetailsModel.create({...feedDetailsItem, createdBy: userLogin})