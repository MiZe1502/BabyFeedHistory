import {
    Dialog,
    DialogContent,
    DialogTitle
} from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import {useLoginPage} from "./useLoginPage";
import {SignInForm} from "./components/SignInForm/SignInForm";
import {SignUpForm} from "./components/SignUpForm/SignUpForm";

export const LoginPage = (): React.ReactElement => {
    const {authMode, onSecondaryButtonClick} = useLoginPage();

    return <Dialog open={true} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <FormattedMessage id="Login.Title" />
            </DialogTitle>
            <DialogContent>
                {authMode === "SignIn" ? <SignInForm /> : <SignUpForm />}
            </DialogContent>
        </Dialog>;
}