import {useRecoilState} from "recoil";

import {atom} from "recoil";

export type AuthMode = "SignIn" | "SignUp";

export const authModeState = atom<AuthMode>({
    key: "authMode",
    default: "SignIn",
});

interface UseLoginModeHook {
    authMode: AuthMode;
    onChangeMode: () => void;
    isSignInMode: () => boolean;
}

export const useLoginMode = (): UseLoginModeHook => {
    const [authMode, setAuthMode] = useRecoilState(authModeState);

    const onChangeMode = () => {
        if (authMode === "SignIn") {
            setAuthMode("SignUp")
        } else if (authMode === "SignUp") {
            setAuthMode("SignIn")
        }
    };

    const isSignInMode = () => {
        return authMode === "SignIn";
    }

    return {
        authMode,
        onChangeMode,
        isSignInMode
    }
}