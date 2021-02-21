import { IResolvers, UserInputError } from "apollo-server-express";
import {createNewUser, getUserByLogin, getUserByName} from "../db/repos/users";
import {
    RegisteredUser,
    UserData,
    UserDocument,
    UserRegistrationData
} from "../db/schemas/users";
import {
    checkAuthorization,
    createToken,
    isPasswordValid,
} from "../utils/utils";
import {validateLoginData, validateRegistrationData} from "../utils/validation";

export const resolvers: IResolvers = {
    Query: {
        userByName:
            async (_, {name}, context): Promise<UserDocument | null> => {
                const curUser = checkAuthorization(context)

                if (!curUser) {
                    return null;
                }

                return getUserByName(name)
            },
        userByLogin:
            async (_, {name}): Promise<UserDocument | null> => getUserByLogin(name),
    },
    Mutation: {
        login:
            async (_: unknown, {login, password}: UserData): Promise<string> => {
                const {errors, isValid} = validateLoginData({login, password})

                if (!isValid) {
                    throw new UserInputError('Incorrect user data', {errors})
                }

                const user = await getUserByLogin(login)

                if (!user) {
                    errors.general = 'User not found'
                    throw new UserInputError(errors.general, {errors})
                }

                const isPassCorrect = await isPasswordValid(password, user.password)
                if (!isPassCorrect) {
                    errors.general = 'Password is incorrect'
                    throw new UserInputError(errors.general, {errors})
                }

                return createToken({login: user.login, name: user.name});
            },
        register: async (_: unknown, {user}: {user: UserRegistrationData}):
            Promise<RegisteredUser | null> => {
            const {errors, isValid} = validateRegistrationData(user)

            if (!isValid) {
                throw new UserInputError('Incorrect user data', {errors})
            }

            const existedUser = await getUserByLogin(user.login)
            if (existedUser) {
                errors.general = 'User with this login already exists'
                throw new UserInputError(errors.general, {errors})
            }

            const createdUser = await createNewUser(user)

            if (createdUser) {
                const token = createToken({login: user.login, name: user.name})
                return {
                    login: createdUser.login,
                    name: createdUser.name,
                    token,
                }
            } else {
                errors.general =
                    'Unexpected error occurred while creating the new user'
                throw new UserInputError(errors.general, {errors})
            }
        }
    }
};
