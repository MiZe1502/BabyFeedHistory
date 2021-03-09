import { IResolvers } from "apollo-server-express";

import {userMutations, userQueries} from "./users";
import {feedMutations, feedQueries, feedSubscriptions} from "./feeds";
import {feedDetailsMutations, feedDetailsQueries} from "./feedDetails";

export const resolvers: IResolvers = {
    Query: {
        ...userQueries,
        ...feedQueries,
        ...feedDetailsQueries,
    },
    Mutation: {
        ...userMutations,
        ...feedMutations,
        ...feedDetailsMutations,
    },
    Subscription: {
        ...feedSubscriptions
    }
};
