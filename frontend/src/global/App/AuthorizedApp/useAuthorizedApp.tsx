import {useEffect, useState} from "react";
import {
    getDataFromLocalStorageByKey, removeDataFromLocalStorageByKey,
    SESSION_TOKEN
} from "../../../utils/localStorage";
import {AuthContext} from "./AuthorizedApp";
import {routes} from "../../../utils/routes";
import { useHistory } from "react-router-dom";
import {ApolloError} from "@apollo/client";

export const useAuthorizedApp = (): AuthContext => {
    const [token, setToken] = useState(getDataFromLocalStorageByKey(SESSION_TOKEN));
    const history = useHistory();

    const updateToken = (token: string) => {
        setToken(token);
    }

    const removeToken = () => {
        setToken("");
    }

    const logout = () => {
        removeDataFromLocalStorageByKey(SESSION_TOKEN);
        removeToken();
        history.push(routes.auth);
    }

    useEffect(() => {
        const tokenFromStorage = getDataFromLocalStorageByKey(SESSION_TOKEN)
        if (!tokenFromStorage) {
            removeToken()
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
        updateToken,
        removeToken,
        logout,
        logoutIfAuthError,
    }
}