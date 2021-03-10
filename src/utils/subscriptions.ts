import {checkAuthorization} from "./token";
import {Context} from "./types";

export const checkSubscriptionOwner =
    (token: string, createdBy: string): boolean => {
    const curUser = checkAuthorization(token)
    return curUser.login === createdBy;
}

export const getSubscribeIterator = (key: string) => {
    return (_: unknown, __: unknown, {pubsub}: Context) =>
        pubsub.asyncIterator([key])
}