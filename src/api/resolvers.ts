import { IResolvers } from "apollo-server-express";
import {getUserByLogin, getUserByName} from "../db/repos/users";
import {UserDocument} from "../db/schemas/users";

export const resolvers: IResolvers = {
    Query: {
        userByName:
            async (_, {name}): Promise<UserDocument | null> => getUserByName(name),
        userByLogin:
            async (_, {name}): Promise<UserDocument | null> => getUserByLogin(name),
    },
};
