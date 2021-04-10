import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import { FormattedMessage } from "react-intl";
import {SignInForm} from "./components/SignInForm/SignInForm";
import {SignUpForm} from "./components/SignUpForm/SignUpForm";
import {useLoginMode} from "./useLoginMode";

export const LoginPage = (): React.ReactElement => {
    const {isSignInMode} = useLoginMode();

    return <Dialog open={true} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <FormattedMessage id={isSignInMode() ?
                    "Login.Title.SignIn" : "Login.Title.SignUp"} />
            </DialogTitle>
            <DialogContent>
                {isSignInMode() ? <SignInForm /> : <SignUpForm />}
            </DialogContent>
        </Dialog>;
}