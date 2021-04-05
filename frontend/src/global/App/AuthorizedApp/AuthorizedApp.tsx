import React from 'react';
import {createContext} from "react";
import {useAuthorizedApp} from "./useAuthorizedApp";

export interface AuthContext {
    token?: string | null;
    updateToken: (token: string) => void;
    removeToken: () => void;
    logout: () => void;
}

export const authContext = createContext<AuthContext | undefined>(undefined);

export const AuthorizedApp: React.FC = ({ children }): React.ReactElement => {
    const auth = useAuthorizedApp();

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}
