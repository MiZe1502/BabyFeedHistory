import {useState} from "react";

export type AuthMode = "SignIn" | "SignUp";

export const MaxNameLength = 256;

// signIn("abs updated login 2", "qwerty12")

export const useLoginPage = () => {
    const [authMode, setAuthMode] = useState<AuthMode>("SignIn");

    const onSecondaryButtonClick = (mode: AuthMode) => {
        setAuthMode(mode)
    }

    return {
        authMode,
        onSecondaryButtonClick
    }
}