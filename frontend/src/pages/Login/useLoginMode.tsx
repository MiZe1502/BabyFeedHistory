import {useRecoilState} from "recoil";
import {AuthMode, authModeState} from "./loginState";

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