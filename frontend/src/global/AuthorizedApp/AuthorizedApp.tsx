import React from 'react';
import {createContext} from "react";
import {useAuth} from "../../common/hooks/useAuth";

export interface AuthContext {
    token?: string;
}

export const authContext = createContext<AuthContext>({});

export const AuthorizedApp: React.FC = ({ children }) => {
    const auth = useAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}
