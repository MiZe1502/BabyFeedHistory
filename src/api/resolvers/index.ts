import { IResolvers } from "apollo-server-express";

import {userMutations, userQueries} from "./users";
import {feedMutations, feedQueries} from "./feeds";

export const resolvers: IResolvers = {
    Query: {
        ...userQueries,
        ...feedQueries,
    },
    Mutation: {
        ...userMutations,
        ...feedMutations,
    }
};
