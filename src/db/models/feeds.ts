import mongoose, {Model} from "mongoose";
import {FeedDocument, feedSchema} from "../schemas/feeds";

export type FeedModel = Model<FeedDocument>

const collectionName = 'feed';

export const feedModel = mongoose.model(collectionName, feedSchema);