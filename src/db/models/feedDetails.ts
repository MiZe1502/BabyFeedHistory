import mongoose, {Model} from "mongoose";
import {FeedDetailsDocument, feedDetailsSchema} from "../schemas/feedDetails";

export type FeedDetailsModel = Model<FeedDetailsDocument>

const collectionName = 'feedDetails';

export const feedDetailsModel = mongoose.model(collectionName, feedDetailsSchema);