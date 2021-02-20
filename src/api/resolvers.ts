import { IResolvers } from "apollo-server-express";
import {createNewUser, getUserByLogin, getUserByName} from "../db/repos/users";
import {User, UserDocument} from "../db/schemas/users";
import {createToken, isPasswordValid} from "../utils";

export const resolvers: IResolvers = {
    Query: {
        userByName:
            async (_, {name}): Promise<UserDocument | null> => getUserByName(name),
        userByLogin:
            async (_, {name}): Promise<UserDocument | null> => getUserByLogin(name),
    },
    Mutation: {
        auth:
            async (_, {login, password}): Promise<string> => {
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
        createUser: async (_, {user}): Promise<User | null> => {
            return await createNewUser(user)
        }
    }
};
