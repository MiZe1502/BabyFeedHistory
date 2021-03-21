import {useState} from "react";

export const useAuthorizedApp = () => {
    const [token, setToken] = useState("");

    const updateToken = (token: string) => {
        console.log(token)
        setToken(token);
    }

    const removeToken = () => {
        setToken("");
    }

    return {
        token,
        updateToken,
        removeToken,
    }
}