import {
    RegisteredUser,
    UserData,
    UserRegistrationData, UserUpdateData
} from "../../../db/schemas/users";
import {
    isValid,
    throwGeneralError, validateLogin,
    validateLoginData,
    validateRegistrationData, validateUpdatingData
} from "../../../utils/validation";
import {
    AuthenticationError,
    UserInputError
} from "apollo-server-express";
import {
    createNewUser,
    getUserByLogin,
    updateUserByLogin
} from "../../../db/repos/users";
import {
    createPasswordHash,
    isPasswordValid
} from "../../../utils/password";
import {checkAuthorization, createToken} from "../../../utils/token";
import {Context} from "../../../utils/types";

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

const updateUser = async (_: unknown, {user}: {user: UserUpdateData},
         {token}: Context): Promise<RegisteredUser | null | void> => {
        const curUser = checkAuthorization(token)

        if (curUser.login !== user.oldLogin?.trim()) {
            throw new AuthenticationError('Authorization error')
        }

        const {errors, isValid: isDataValid} = validateUpdatingData(user)

        if (!isDataValid) {
            throw new UserInputError('Incorrect user data', {errors})
        }

        if (user.login !== user.oldLogin) {
            const errors = validateLogin(user.login);

            if (!isValid(errors)) {
                throw new UserInputError('Incorrect user login', {errors})
            }

            const existedUser = await getUserByLogin(user.login)
            if (existedUser) {
                return throwGeneralError('User with this login already exists',
                    errors)
            }
        }

        const updatedUser = await getUserByLogin(user.oldLogin);
        if (!updatedUser) {
            return throwGeneralError('Updated user does not exist',
                errors)
        }

        updatedUser.login = user.login;
        updatedUser.name = user.name;

        let hashPassword = ''
        if (user.password) {
            hashPassword = await createPasswordHash(user.password)
            updatedUser.password = hashPassword;
        }

        const updatedUserData = await updateUserByLogin(user.oldLogin, updatedUser);

        if (updatedUserData) {
            const token = createToken({login: updatedUserData.login,
                    name: updatedUserData.name})
            return {
                login: updatedUserData.login,
                name: updatedUserData.name,
                token,
            }
        } else {
            return throwGeneralError(
                'Unexpected error occurred while creating the new user', errors)
        }
    }

export const mutations = {
    login,
    register,
    updateUser
}