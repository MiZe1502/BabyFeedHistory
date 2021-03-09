import {AuthenticationError,
    UserInputError} from "apollo-server-express";
import {UserData} from "../../../db/schemas/users";
import {getUserByLogin} from "../../../db/repos/users";
import {checkAuthorization} from "../../../utils/token";
import {isValid, validateLogin} from "../../../utils/validation";
import {Context} from "../../../utils/types";

const userByLogin = async (_: unknown, {login}: Partial<UserData>,
      context: Context): Promise<Omit<UserData, 'password'> | null> => {
    const errors = validateLogin(login);

    if (!isValid(errors)) {
        throw new UserInputError('Incorrect user login', {errors})
    }

    const curUser = checkAuthorization(context)

    if (curUser.login !== login?.trim()) {
        throw new AuthenticationError('Authorization error')
    }

    const user = await getUserByLogin(login)

    if (!user) {
        throw new UserInputError('User not found', {errors})
    }

    return {
        login: user?.login,
        name: user?.name
    }
}

export const queries = {
    userByLogin,
}