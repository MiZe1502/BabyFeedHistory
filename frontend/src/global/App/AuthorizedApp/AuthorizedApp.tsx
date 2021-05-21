import React from 'react';
import {createContext} from "react";
import {useAuthorizedApp} from "./useAuthorizedApp";
import {ApolloError} from "@apollo/client";
import {Localization} from "../../../api/user/queries";

export interface AuthContext {
    token?: string | null;
    login?: string | null;
    loc?: string | null;
    updateToken: (token: string) => void;
    removeToken: () => void;
    updateLogin: (login: string) => void;
    removeLogin: () => void;
    updateLoc: (loc: Localization) => void;
    removeLoc: () => void;
    logout: () => void;
    logoutIfAuthError: (error?: ApolloError) => void;
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
