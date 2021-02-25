import mongoose, { Document } from "mongoose";
import {FeedModel} from "../models/feeds";

const Schema = mongoose.Schema;

export interface FeedData {
    key: string;
    timestamp: number;
    createdBy: string;
}

export interface FeedDocument extends FeedData, Document {}

export const feedSchema = new Schema<FeedDocument, FeedModel>({
    key: {type: String, required: true},
    timestamp: {type: Number, required: true},
    createdBy: {type: String, required: true},
})