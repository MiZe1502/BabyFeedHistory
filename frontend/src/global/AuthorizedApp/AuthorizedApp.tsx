import React from 'react';
import {createContext} from "react";
import {useAuthorizedApp} from "./useAuthorizedApp";

export interface AuthContext {
    token?: string;
    updateToken: (token: string) => void;
    removeToken: () => void;
}

export const authContext = createContext<AuthContext | undefined>(undefined);

export const AuthorizedApp: React.FC = ({ children }) => {
    const auth = useAuthorizedApp();

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}
