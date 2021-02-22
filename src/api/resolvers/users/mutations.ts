import {
    RegisteredUser,
    UserData,
    UserRegistrationData
} from "../../../db/schemas/users";
import {
    throwGeneralError,
    validateLoginData,
    validateRegistrationData
} from "../../../utils/validation";
import {UserInputError} from "apollo-server-express";
import {createNewUser, getUserByLogin} from "../../../db/repos/users";
import {
    createPasswordHash,
    isPasswordValid
} from "../../../utils/password";
import {createToken} from "../../../utils/token";

const login = async (_: unknown, {login, password}: UserData):
    Promise<string | void> => {
    const {errors, isValid} = validateLoginData({login, password})

    if (!isValid) {
        throw new UserInputError('Incorrect user data', {errors})
    }

    const user = await getUserByLogin(login)

    if (!user) {
        return throwGeneralError('User not found', errors)
    }

    const isPassCorrect = await isPasswordValid(password, user.password)
    if (!isPassCorrect) {
        return throwGeneralError('Password is incorrect', errors)
    }

    return createToken({login: user.login, name: user.name});
}

const register = async (_: unknown, {user}: {user: UserRegistrationData}):
    Promise<RegisteredUser | null | void> => {
    const {errors, isValid} = validateRegistrationData(user)

    if (!isValid) {
        throw new UserInputError('Incorrect user data', {errors})
    }

    const existedUser = await getUserByLogin(user.login)
    if (existedUser) {
        return throwGeneralError('User with this login already exists', errors)
    }

    const hashPassword = await createPasswordHash(user.password)
    const createdUser = await createNewUser({...user, password: hashPassword})

    if (createdUser) {
        const token = createToken({login: user.login, name: user.name})
        return {
            login: createdUser.login,
            name: createdUser.name,
            token,
        }
    } else {
        return throwGeneralError(
            'Unexpected error occurred while creating the new user', errors)
    }
}

export const mutations = {
    login,
    register
}