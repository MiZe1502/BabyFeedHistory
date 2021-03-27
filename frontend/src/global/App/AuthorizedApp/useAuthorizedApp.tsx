import {useEffect, useState} from "react";
import {
    getDataFromLocalStorageByKey,
    SESSION_TOKEN
} from "../../../utils/localStorage";
import {AuthContext} from "./AuthorizedApp";

export const useAuthorizedApp = (): AuthContext => {
    const [token, setToken] = useState(getDataFromLocalStorageByKey(SESSION_TOKEN));

    const updateToken = (token: string) => {
        setToken(token);
    }

    const removeToken = () => {
        setToken("");
    }

    useEffect(() => {
        const tokenFromStorage = getDataFromLocalStorageByKey(SESSION_TOKEN)
        if (!tokenFromStorage) {
            removeToken()
        } else {
            updateToken(tokenFromStorage)
        }
    }, [])

    return {
        token,
        updateToken,
        removeToken,
    }
}