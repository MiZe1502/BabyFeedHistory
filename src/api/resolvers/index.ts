import { IResolvers } from "apollo-server-express";

import {userMutations, userQueries} from "./users";

export const resolvers: IResolvers = {
    Query: {
        ...userQueries
    },
    Mutation: {
        ...userMutations
    }
};
