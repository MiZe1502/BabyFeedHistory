import mongoose, { Document } from "mongoose";
import { UserModel } from "../models/users";

const Schema = mongoose.Schema;

export interface UserData {
    login: string;
    name?: string;
    password: string;
}

export interface UserRegistrationData extends UserData {
    confirmPassword: string;
}

export interface UserUpdateData extends UserRegistrationData {
    oldLogin?: string;
}

export interface RegisteredUser extends Omit<UserData, 'password'> {
    token: string;
}

export interface UserDocument extends UserData, Document {}

export const userSchema = new Schema<UserDocument, UserModel>({
    login: {type: String, required: true},
    password: {type: String, required: true},
    name: String,
});