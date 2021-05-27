import {useEffect, useState} from "react";
import {
    addDataToLocalStorage,
    CURRENT_LOC,
    CURRENT_LOGIN,
    getDataFromLocalStorageByKey, removeDataFromLocalStorageByKey,
    SESSION_TOKEN
} from "../../../utils/localStorage";
import {AuthContext} from "./AuthorizedApp";
import {routes} from "../../../utils/routes";
import { useHistory } from "react-router-dom";
import {ApolloError} from "@apollo/client";
import {Localization} from "../../../api/user/queries";
import { parseToken } from "../../../common/utils/helpers";

export const useAuthorizedApp = (): AuthContext => {
    const [token, setToken] = useState(getDataFromLocalStorageByKey(SESSION_TOKEN));
    const [login, setLogin] = useState(getDataFromLocalStorageByKey(CURRENT_LOGIN));
    const [loc, setLoc] = useState(getDataFromLocalStorageByKey(CURRENT_LOC));
    const history = useHistory();

    const updateToken = (token: string) => {
        setToken(token);
    }

    const updateLogin = (login: string) => {
        setLogin(login);
    }

    const removeToken = () => {
        setToken("");
    }

    const removeLogin = () => {
        setToken("");
    }

    const updateLoc = (loc: Localization) => {
        setLoc(loc);
    }

    const removeLoc = () => {
        setLoc("");
    }

    const logout = () => {
        removeDataFromLocalStorageByKey(SESSION_TOKEN);
        clearData();
        history?.push(routes.auth);
    }

    const updateAuthData = (token: string, login: string, loc: Localization) => {
        updateToken(token);
        updateLogin(login);
        updateLoc(loc);
        addDataToLocalStorage(SESSION_TOKEN, token);
        addDataToLocalStorage(CURRENT_LOGIN, login);
        addDataToLocalStorage(CURRENT_LOC, loc);

        startExpirationTimer(token);
    }

    const startExpirationTimer = (token: string) => {
        const parsedToken = parseToken(token) as {exp: number};
        const now = new Date();
        const exp = new Date(parsedToken.exp * 1000);

        setTimeout(() => {
            logout();
        }, exp.getTime() - now.getTime());
    }

    const clearData = () => {
        removeToken();
        removeLogin();
        removeLoc();
        removeDataFromLocalStorageByKey(SESSION_TOKEN);
        removeDataFromLocalStorageByKey(CURRENT_LOGIN);
        removeDataFromLocalStorageByKey(CURRENT_LOC);
    }

    useEffect(() => {
        const tokenFromStorage = getDataFromLocalStorageByKey(SESSION_TOKEN)
        if (!tokenFromStorage) {
            clearData();
        } else {
            updateToken(tokenFromStorage)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const logoutIfAuthError = (error?: ApolloError) => {
        if (error && error.message === 'Authentication error') {
            logout();
        }
    }

    return {
        token,
        login,
        loc,
        updateToken,
        removeToken,
        updateLogin,
        removeLogin,
        updateLoc,
        removeLoc,
        logout,
        logoutIfAuthError,
        updateAuthData,
    }
}