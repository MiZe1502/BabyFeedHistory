import mongoose, {Model} from "mongoose";
import {UserDocument, userSchema} from "../schemas/users";

export type UserModel = Model<UserDocument>

const collectionName = 'user';

export const userModel = mongoose.model(collectionName, userSchema);
