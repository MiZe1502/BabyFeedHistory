import {
    Button, CircularProgress,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, TextField, Typography
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {gql, useMutation} from "@apollo/client";
import {useAuth} from "../../common/hooks/useAuth";
import ErrorIcon from '@material-ui/icons/Error';
import css from "./LoginPage.scss"
import {useForm} from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";

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
    const intl = useIntl();

    const { register, handleSubmit, formState: {
        errors
    } } = useForm<LoginForm>({
    });

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
        signIn(data.login, data.password);
    }

    return <Dialog open={true} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <FormattedMessage id="Login.Title" />
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                    <TextField
                        inputRef={register({
                            required: intl.formatMessage({id: "Login.Validation.Field.Required"}),
                        })}
                        autoFocus
                        margin="dense"
                        defaultValue=""
                        id="login"
                        name="login"
                        label={intl.formatMessage({id: "Login.Fields.Login"})}
                        type="email"
                        fullWidth
                        disabled={loading}
                        error={Boolean(errors.login)}
                        helperText={errors.login?.message}
                    />
                    <TextField
                        inputRef={register({
                            required: intl.formatMessage({id: "Login.Validation.Field.Required"}),
                        })}
                        autoFocus
                        defaultValue=""
                        margin="dense"
                        id="password"
                        name="password"
                        label={intl.formatMessage({id: "Login.Fields.Password"})}
                        type="password"
                        fullWidth
                        disabled={loading}
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                    />
                    {error && <Typography className={css.FlexHorCenter} color="error" variant="h6" component="h6">
                        <ErrorIcon className={css.ErrorIcon} color="error" fontSize="small"/>
                            {error.message}
                    </Typography>}
                    <DialogActions>
                        {loading ?
                            <CircularProgress className={css.Loading} size={16} disableShrink /> :
                            <Button type="submit" color="primary">
                                <FormattedMessage id="Login.Buttons.SignIn" />
                        </Button>}
                        <Button onClick={() => {}} color="secondary">
                            <FormattedMessage id="Login.Buttons.SignUp" />
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>;
}