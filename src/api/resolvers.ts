import { IResolvers, UserInputError } from "apollo-server-express";
import {createNewUser, getUserByLogin, getUserByName} from "../db/repos/users";
import {User, UserData, UserDocument} from "../db/schemas/users";
import {
    checkAuthorization,
    createToken,
    isPasswordValid,
} from "../utils/utils";
import {validateLoginData} from "../utils/validation";

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
        register: async (_, {user}): Promise<User | null> => {
            return await createNewUser(user)
        }
    }
};
