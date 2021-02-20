import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {User} from "./db/schemas/users";
import {getConfigValueByKey} from "./configuration";

export const createToken = (userData: Partial<User>): string => {
    const secret = getConfigValueByKey('secret')
    const exp = getConfigValueByKey('exp')

    if (typeof secret !== 'string') {
        throw 'Incorrect secret for token generation'
    }

    return jwt.sign(
        userData ,
        secret,
        { algorithm: "HS256", expiresIn: exp }
    );
}

export const createPasswordHash = async (password: string): Promise<string> => {
    const saltRounds = getConfigValueByKey('saltRounds')
    return await bcrypt.hash( password, saltRounds);
}

export const isPasswordValid =
    async (plainPassword: string, hashPassword: string): Promise<boolean> => {
    return await bcrypt.compare(plainPassword, hashPassword);
}