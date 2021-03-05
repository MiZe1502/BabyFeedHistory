import {FeedDetailsData} from "../schemas/feedDetails";
import {feedDetailsModel} from "../models/feedDetails";
import {QueryResult} from "../../utils/types";
import {v4 as uuidv4} from "uuid";

export const getAvailableFeedDetailsForUser = async (userLogin: string):
    Promise<FeedDetailsData[] | null> => feedDetailsModel.find({createdBy: userLogin})

export const createNewFeedDetails =
    async (userLogin: string, feedDetailsItem: FeedDetailsData):
        Promise<FeedDetailsData | null> => {
    const key = uuidv4();
        const newFeedDetailsItem: FeedDetailsData = {
        ...feedDetailsItem,
        key,
        createdBy: userLogin
    }
    return feedDetailsModel.create(newFeedDetailsItem)
}

export const updateFeedDetailsItem =
    async (userLogin: string, oldName: string, newFeedDetailsData: FeedDetailsData):
        QueryResult => {
    return feedDetailsModel.updateOne({
      $and: [
          { name: oldName },
          { createdBy: userLogin }
      ]
    }, newFeedDetailsData)
}

export const removeFeedDetailsItem =
    async (userLogin: string, name: string): QueryResult => {
    return feedDetailsModel.remove({
        $and: [
            { name },
            { createdBy: userLogin }
        ]
    })
}