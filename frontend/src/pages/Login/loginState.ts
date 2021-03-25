import {atom} from "recoil";

export type AuthMode = "SignIn" | "SignUp";

export const authModeState = atom<AuthMode>({
    key: "authMode",
    default: "SignIn",
});