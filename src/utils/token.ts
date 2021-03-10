import {UserData} from "../db/schemas/users";
import {getConfigValueByKey} from "../configuration";
import jwt from "jsonwebtoken";
import {AuthenticationError} from "apollo-server-express";
import {Context} from "./types";

export type TokenUserData = Omit<UserData, 'password'>

export const createToken = (userData: TokenUserData): string => {
    const secret = getConfigValueByKey('secret')
    const exp = getConfigValueByKey('exp')

    if (typeof secret !== 'string') {
        throw 'Incorrect secret for token generation'
    }

    if (typeof exp !== 'string') {
        throw 'Incorrect expiration value for token generation'
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

export const checkAuthorization =
    (token: string): TokenUserData => {
    if (!token || token.length === 0) {
        throw new AuthenticationError('Token not provided');
    }

    const userFromToken = parseToken(token);

    if (!userFromToken) {
        throw new AuthenticationError('Authentication error');
    }

    return userFromToken;
}