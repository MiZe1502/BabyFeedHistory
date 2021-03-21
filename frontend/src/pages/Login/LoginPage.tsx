import {
    Button, CircularProgress,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, TextField
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {gql, useMutation} from "@apollo/client";
import {useAuth} from "../../common/hooks/useAuth";

import css from "./LoginPage.scss"
import {useForm} from "react-hook-form";

const MUTATION_AUTH = gql`
    mutation Auth($login: String!, $password: String!) {
        login(login: $login, password: $password)
    }
`

export interface LoginResp {
    login: string;
}

interface LoginForm {
    login: string;
    password: string;
}

// signIn("abs updated login 2", "qwerty12")

export const LoginPage = () => {
    const auth = useAuth();

    const { register, handleSubmit, formState: {
        errors
    }, formState } = useForm<LoginForm>();

    const [authMethod, { error, data, loading }] = useMutation<LoginResp>(MUTATION_AUTH);

    const signIn = (login: string, password: string) => {
        authMethod({ variables: { login, password } })
            .then((res) => {
                console.log(auth, res, data)
                auth?.updateToken(res?.data?.login || "")
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const onSubmit = (data: LoginForm) => {
        console.log(formState)
        signIn(data.login, data.password);
    }

    return <div>
        <Dialog open={true} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Authorize</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                    <TextField
                        inputRef={register({
                            required: 'Email address field should not be empty',
                        })}
                        autoFocus
                        margin="dense"
                        defaultValue=""
                        id="login"
                        name="login"
                        label="Email Address"
                        type="email"
                        fullWidth
                        disabled={loading}
                        error={Boolean(errors.login)}
                        helperText={errors.login}
                    />
                    <TextField
                        inputRef={register({
                            required: 'Password field should not be empty'
                        })}
                        autoFocus
                        defaultValue=""
                        margin="dense"
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        disabled={loading}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                    />
                    <DialogActions>
                        {loading ?
                            <CircularProgress className={css.Loading} size={16} disableShrink /> :
                            <Button type="submit" color="primary">
                            Sign In
                        </Button>}
                        <Button onClick={() => {}} color="secondary">
                            Sign Up
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    </div>;
}