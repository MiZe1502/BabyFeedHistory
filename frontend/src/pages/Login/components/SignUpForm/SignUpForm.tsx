import {TextFieldWrapped} from "../../../../common/components/TextField/TextField";
import {ErrorMessage} from "../../../../common/components/ErrorMessage/ErrorMessage";
import {Button, DialogActions} from "@material-ui/core";
import {ButtonWithLoading}
    from "../../../../common/components/ButtonWithLoading/ButtonWithLoading";
import {FormattedMessage} from "react-intl";
import React from "react";
import {MaxNameLength, useSignUpForm} from "./useSignUpForm";
import {useLoginMode} from "../../useLoginMode";

export const SignUpForm = () => {
    const {
        intl,
        register,
        handleSubmit,
        errors,
        error,
        loading,
        onSubmit,
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
        <TextFieldWrapped
            inputRef={register({
                required: intl.formatMessage({
                    id: "Login.Validation.Field.Required"}),
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
        <TextFieldWrapped
            inputRef={register({
                required: intl.formatMessage({
                    id: "Login.Validation.Field.Required"}),
            })}
            defaultValue=""
            id="confirmPassword"
            name="confirmPassword"
            label={intl.formatMessage({
                id: "Login.Fields.ConfirmPassword"})}
            type="confirmPassword"
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