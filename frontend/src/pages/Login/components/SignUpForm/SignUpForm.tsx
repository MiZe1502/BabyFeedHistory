import {TextFieldWrapped} from "../../../../common/components/TextField/TextField";
import {ErrorMessage} from "../../../../common/components/ErrorMessage/ErrorMessage";
import {
    Button,
    DialogActions,
} from "@material-ui/core";
import {ButtonWithLoading}
    from "../../../../common/components/ButtonWithLoading/ButtonWithLoading";
import {FormattedMessage} from "react-intl";
import React from "react";
import {MaxNameLength, useSignUpForm} from "./useSignUpForm";
import {useLoginMode} from "../../useLoginMode";
import {PasswordTextField} from
        "../../../../common/components/PasswordTextField/PasswordTextField";

export const SignUpForm = (): React.ReactElement => {
    const {
        intl,
        register,
        handleSubmit,
        errors,
        error,
        loading,
        onSubmit,
        getValues,
    } = useSignUpForm();

    const {onChangeMode} = useLoginMode();

    return <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <TextFieldWrapped
            inputRef={register({
                required: intl.formatMessage({
                    id: "Login.Validation.Field.Required"}),
            })}
            defaultValue=""
            id="login"
            name="login"
            label={intl.formatMessage({id: "Login.Fields.Login"})}
            type="email"
            disabled={loading}
            error={Boolean(errors.login)}
            helperText={errors.login?.message}
        />
        <TextFieldWrapped
            inputRef={register({
                maxLength: MaxNameLength
            })}
            defaultValue=""
            id="name"
            name="name"
            label={intl.formatMessage({id: "Login.Fields.Name"})}
            type="text"
            disabled={loading}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
        />
        <PasswordTextField
            inputRef={register({
                required: intl.formatMessage({
                    id: "Login.Validation.Field.Required"}),
            })}
            defaultValue=""
            id="password"
            name="password"
            label={intl.formatMessage({id: "Login.Fields.Password"})}
            disabled={loading}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
        />
        <PasswordTextField
            inputRef={register({
                required: intl.formatMessage({
                    id: "Login.Validation.Field.Required"}),
                validate: {
                    equal: (value) => value === getValues().password,
                }
            })}
            defaultValue=""
            id="confirmPassword"
            name="confirmPassword"
            label={intl.formatMessage({
                id: "Login.Fields.ConfirmPassword"})}
            disabled={loading}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword?.message}
        />
        <ErrorMessage showError={Boolean(error)}
                      errorMessage={error?.message}/>
        <DialogActions>
            <ButtonWithLoading loading={loading}
                               locId="Login.Buttons.SignUp" />
            <Button onClick={onChangeMode}
                    color="secondary">
                <FormattedMessage id="Login.Buttons.SignIn" />
            </Button>
        </DialogActions>
    </form>
}