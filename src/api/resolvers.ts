import { IResolvers } from "apollo-server-express";
import {createNewUser, getUserByLogin, getUserByName} from "../db/repos/users";
import {User, UserDocument} from "../db/schemas/users";
import {
    checkAuthorization,
    createToken,
    isPasswordValid,
    TokenUserData
} from "../utils";

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
            async (_, {login, password}): Promise<string> => {
                //TODO: validate user data

                const user = await getUserByLogin(login)

                if (!user) {
                    throw "User not found"
                }

                const isPassCorrect = await isPasswordValid(password, user.password)
                if (!isPassCorrect) {
                    throw "Password is incorrect"
                }

                return createToken({login: user.login, name: user.name});
            },
        register: async (_, {user}): Promise<User | null> => {
            return await createNewUser(user)
        }
    }
};
