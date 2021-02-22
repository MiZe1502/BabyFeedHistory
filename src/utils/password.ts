import bcrypt from 'bcrypt'
import {getConfigValueByKey} from "../configuration";

export const createPasswordHash = async (password: string): Promise<string> => {
    const saltRounds = getConfigValueByKey('saltRounds')
    return await bcrypt.hash( password, saltRounds);
}

export const isPasswordValid =
    async (plainPassword: string, hashPassword: string): Promise<boolean> => {
    return await bcrypt.compare(plainPassword, hashPassword);
}