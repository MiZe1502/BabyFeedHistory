import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, Typography
} from "@material-ui/core";
import React from "react";
import ErrorIcon from '@material-ui/icons/Error';
import css from "./LoginPage.scss"
import { FormattedMessage } from "react-intl";
import {useLoginPage} from "./useLoginPage";
import {ButtonWithLoading} from "../../common/components/ButtonWithLoading/ButtonWithLoading";
import {TextFieldWrapped} from "../../common/components/TextField/TextField";
import {ErrorMessage} from "../../common/components/ErrorMessage/ErrorMessage";

export const LoginPage = () => {
    const {
        handleSubmit,
        register,
        onSubmit,
        loading,
        errors,
        intl,
        error,
    } = useLoginPage();

    return <Dialog open={true} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <FormattedMessage id="Login.Title" />
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                    <TextFieldWrapped
                        inputRef={register({
                            required: intl.formatMessage({id: "Login.Validation.Field.Required"}),
                        })}
                        defaultValue=""
                        id="login"
                        name="login"
                        label={intl.formatMessage({id: "Login.Fields.Login"})}
                        type="email"
                        disabled={loading}
                        error={Boolean(errors.login)}
                        helperText={errors.login?.message}/>
                    <TextFieldWrapped
                        inputRef={register({
                            required: intl.formatMessage({id: "Login.Validation.Field.Required"}),
                        })}
                        defaultValue=""
                        id="password"
                        name="password"
                        label={intl.formatMessage({id: "Login.Fields.Password"})}
                        type="password"
                        disabled={loading}
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                    />
                    <ErrorMessage showError={Boolean(error)} errorMessage={error?.message}/>
                    <DialogActions>
                        <ButtonWithLoading loading={loading} locId="Login.Buttons.SignIn" />
                        <Button onClick={() => {}} color="secondary">
                            <FormattedMessage id="Login.Buttons.SignUp" />
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>;
}