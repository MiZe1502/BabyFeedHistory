import jwt, {TokenExpiredError} from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {UserData} from "./db/schemas/users";
import {getConfigValueByKey} from "./configuration";
import {AuthenticationError, ExpressContext} from "apollo-server-express";

export type TokenUserData = Omit<UserData, 'password'>

export const createToken = (userData: TokenUserData): string => {
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

export const parseToken = (token: string): TokenUserData | null | void => {
    try {
        const secret = getConfigValueByKey('secret')

        if (typeof secret !== 'string') {
            throw 'Incorrect secret for token decoding'
        }

        return jwt.verify(token, secret) as TokenUserData;
    } catch (err) {
        console.log('Authentication error')
        return null
    }
}

export const createPasswordHash = async (password: string): Promise<string> => {
    const saltRounds = getConfigValueByKey('saltRounds')
    return await bcrypt.hash( password, saltRounds);
}

export const isPasswordValid =
    async (plainPassword: string, hashPassword: string): Promise<boolean> => {
    return await bcrypt.compare(plainPassword, hashPassword);
}

export const checkAuthorization =
    (context: ExpressContext): {currentUser: TokenUserData} => {
    const token = context.req.headers.authorization || '';

    if (!token || token.length === 0) {
        throw new AuthenticationError('Token not provided');
    }

    const userFromToken = parseToken(token);

    if (!userFromToken) {
        throw new AuthenticationError('Authentication error');
    }

    return { currentUser: userFromToken };
}