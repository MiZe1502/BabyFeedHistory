import {ExpressContext} from "apollo-server-express";
import {UserDocument} from "../../../db/schemas/users";
import {getUserByLogin, getUserByName} from "../../../db/repos/users";
import {checkAuthorization} from "../../../utils/token";

const userByName = async (_: unknown, {name}: {name: string},
           context: ExpressContext): Promise<UserDocument | null> => {
    const curUser = checkAuthorization(context)

    if (!curUser) {
        return null;
    }

    return getUserByName(name)
}

const userByLogin = async (_: unknown, {name}: {name: string}):
    Promise<UserDocument | null> => getUserByLogin(name)

export const queries = {
    userByName,
    userByLogin,
}