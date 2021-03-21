import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, TextField
} from "@material-ui/core";
import React, {useState} from "react";
import {gql, useMutation} from "@apollo/client";
import {useAuth} from "../../common/hooks/useAuth";

import css from "./LoginPage.scss"

const MUTATION_AUTH = gql`
    mutation Auth($login: String!, $password: String!) {
        login(login: $login, password: $password)
    }
`

export interface LoginResp {
    login: string;
}

export const LoginPage = () => {
    const auth = useAuth();

    const [authMethod, data] = useMutation<LoginResp>(MUTATION_AUTH);

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const signIn = (login: string, password: string) => {
        authMethod({ variables: { login, password } })
            .then((res) => {
                console.log(auth, res, data)
                auth?.updateToken(res?.data?.login || "")
            });
    }

    const onLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value)
    }

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const onSignInClick = () => {
        // signIn("abs updated login 2", "qwerty12")
        signIn(login, password)
    }

    return <div>
        <Dialog open={true} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Authorize</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="login"
                    label="Email Address"
                    type="email"
                    fullWidth
                    value={login}
                    onChange={onLoginChange}
                    className={css.LoginField}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={onPasswordChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onSignInClick} color="primary">
                    Sign In
                </Button>
                <Button onClick={() => {}} color="secondary">
                    Sign Up
                </Button>
            </DialogActions>
        </Dialog>
    </div>;
}