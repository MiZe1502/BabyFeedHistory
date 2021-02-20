import {userModel} from "../models/users";
import {User, UserDocument} from "../schemas/users";

export const getUserByLogin = async (login: string): Promise<UserDocument | null> => {
    return userModel.findOne({login});
}

export const getUserByName = async (name: string): Promise<UserDocument | null> => {
    return userModel.findOne({name});
}

export const createNewUser = async (userData: User): Promise<UserDocument | null> => {
    return userModel.create(userData)
}

export const updateUserByLogin =
    async (oldLogin: string, newUserData: User): Promise<UserDocument | null> => {
    return userModel.updateOne({login: oldLogin}, newUserData)
}