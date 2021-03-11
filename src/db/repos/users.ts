import {userModel} from "../models/users";
import {UserData} from "../schemas/users";

export const getUserByLogin = async (login: string): Promise<UserData | null> => {
    return userModel.findOne({login});
}

export const createNewUser = async (userData: UserData): Promise<UserData | null> => {
    return userModel.create(userData)
}

export const updateUserByLogin =
    async (oldLogin: string, newUserData: UserData): Promise<UserData | null> => {
    return userModel.findOneAndUpdate({login: oldLogin}, newUserData, {new: true})
}