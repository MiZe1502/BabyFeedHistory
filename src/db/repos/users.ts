import {userModel} from "../models/users";
import {User, UserDocument} from "../schemas/users";
import {createPasswordHash} from "../../utils/utils";

export const getUserByLogin = async (login: string): Promise<UserDocument | null> => {
    return userModel.findOne({login});
}

export const getUserByName = async (name: string): Promise<UserDocument | null> => {
    return userModel.findOne({name});
}

export const createNewUser = async (userData: User): Promise<User | null> => {
    const hashPassword = await createPasswordHash(userData.password)
    const userWithHashPassword = {...userData, password: hashPassword}
    return userModel.create(userWithHashPassword)
}

export const updateUserByLogin =
    async (oldLogin: string, newUserData: User): Promise<UserDocument | null> => {
    return userModel.updateOne({login: oldLogin}, newUserData)
}