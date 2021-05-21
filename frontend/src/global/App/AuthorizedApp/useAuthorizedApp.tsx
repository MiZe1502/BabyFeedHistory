import {useEffect, useState} from "react";
import {
    CURRENT_LOGIN,
    getDataFromLocalStorageByKey, removeDataFromLocalStorageByKey,
    SESSION_TOKEN
} from "../../../utils/localStorage";
import {AuthContext} from "./AuthorizedApp";
import {routes} from "../../../utils/routes";
import { useHistory } from "react-router-dom";
import {ApolloError} from "@apollo/client";
import {Localization} from "../../../api/user/queries";

export const useAuthorizedApp = (): AuthContext => {
    const [token, setToken] = useState(getDataFromLocalStorageByKey(SESSION_TOKEN));
    const [login, setLogin] = useState(getDataFromLocalStorageByKey(CURRENT_LOGIN));
    const [loc, setLoc] = useState(getDataFromLocalStorageByKey(CURRENT_LOGIN));
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

    const clearData = () => {
        removeToken();
        removeLogin();
        removeLoc();
    }

    useEffect(() => {
        const tokenFromStorage = getDataFromLocalStorageByKey(SESSION_TOKEN)
        if (!tokenFromStorage) {
            clearData();
        } else {
            updateToken(tokenFromStorage)
        }
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
    }
}