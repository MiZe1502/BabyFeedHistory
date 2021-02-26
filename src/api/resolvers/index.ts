import { IResolvers } from "apollo-server-express";

import {userMutations, userQueries} from "./users";
import {feedQueries} from "./feeds";

export const resolvers: IResolvers = {
    Query: {
        ...userQueries,
        ...feedQueries,
    },
    Mutation: {
        ...userMutations
    }
};
