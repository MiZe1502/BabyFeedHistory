import {TextFieldWrapped} from "../../../../common/components/TextField/TextField";
import {ErrorMessage} from "../../../../common/components/ErrorMessage/ErrorMessage";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import {ButtonWithLoading}
    from "../../../../common/components/ButtonWithLoading/ButtonWithLoading";
import {FormattedMessage} from "react-intl";
import React from "react";
import {useSignInForm} from "./useSignInForm";
import {useLoginMode} from "../../../../state/useLoginMode";
import {PasswordTextField}
    from "../../../../common/components/PasswordTextField/PasswordTextField";

export const SignInForm = (): React.ReactElement => {
    const {
        intl,
        register,
        handleSubmit,
        errors,
        error,
        loading,
        onSubmit,
    } = useSignInForm();

    const {onChangeMode} = useLoginMode();

    return <form onSubmit={handleSubmit(onSubmit)} noValidate
                 autoComplete="off">
        <TextFieldWrapped
            inputRef={register({
                required: intl.formatMessage({
                    id: "Login.Validation.Field.Required"
                }),
            })}
            defaultValue=""
            id="login"
            name="login"
            label={intl.formatMessage({id: "Login.Fields.Login"})}
            type="email"
            disabled={loading}
            error={Boolean(errors.login)}
            helperText={errors.login?.message}/>
        <PasswordTextField
            inputRef={register({
                required: intl.formatMessage({
                    id: "Login.Validation.Field.Required"
                }),
            })}
            defaultValue=""
            id="password"
            name="password"
            label={intl.formatMessage({id: "Login.Fields.Password"})}
            disabled={loading}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
        />
        <ErrorMessage showError={Boolean(error)}
                      errorMessage={error?.message}/>
        <DialogActions>
            <ButtonWithLoading loading={loading}
                               locId="Login.Buttons.SignIn"/>
            <Button onClick={onChangeMode}
                    color="secondary">
                <FormattedMessage id="Login.Buttons.SignUp"/>
            </Button>
        </DialogActions>
    </form>
}