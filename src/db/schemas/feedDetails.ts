import mongoose, { Document } from "mongoose";
import {FeedDetailsModel} from "../models/feedDetails";

const Schema = mongoose.Schema;

export type FeedDetailsType = "valueWithAmount" | "checkedValue"

export interface FeedDetailsData {
    key: string;
    type: FeedDetailsType;
    name: string;
    amount?: number;
    amountOfWhat?: string;
    wasGiven?: boolean;
    createdBy: string;
}

export interface FeedDetailsDocument extends FeedDetailsData, Document {}

export const feedDetailsSchema = new Schema<FeedDetailsDocument, FeedDetailsModel>({
    key: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    type: {type: String, required: true},
    amount: {type: Number},
    amountOfWhat: {type: String},
    wasGiven: {type: Boolean},
    createdBy: {type: String},
})
