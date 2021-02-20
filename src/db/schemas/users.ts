import mongoose, { Document } from "mongoose";
import { UserModel } from "../models/users";

const Schema = mongoose.Schema;

export interface User extends Document {
    login: string;
    name: string;
    password: string;
}

export interface UserDocument extends User, Document {}

export const userSchema = new Schema<UserDocument, UserModel>({
    login: {type: String, required: true},
    password: {type: String, required: true},
    name: String,
});