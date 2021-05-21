import React from "react";
import {UserAccount} from "../../../../api/user/queries";
import {TextFieldWrapped} from "../../../../common/components/TextField/TextField";
import {MaxNameLength} from "../../../Login/components/SignUpForm/useSignUpForm";
import {PasswordTextField} from "../../../../common/components/PasswordTextField/PasswordTextField";
import {ErrorMessage} from "../../../../common/components/ErrorMessage/ErrorMessage";
import DialogActions from "@material-ui/core/DialogActions";
import {ButtonWithLoading} from "../../../../common/components/ButtonWithLoading/ButtonWithLoading";
import {useAccountData} from "./useAccountData";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {Controller} from "react-hook-form";
import InputLabel from "@material-ui/core/InputLabel";

import css from "./AccountData.scss";

interface AccountDataProps {
    accountData: UserAccount;
}

export const AccountData = ({accountData}: AccountDataProps) => {
    const {
        intl,
        register,
        control,
        handleSubmit,
        onSubmit,
        loading,
        errors,
        isGoingToChangePassword,
        error,
        onPasswordChange,
        getValues
    } = useAccountData();

    return <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <TextFieldWrapped
            inputRef={register({
                required: intl.formatMessage({
                    id: "Login.Validation.Field.Required"}),
            })}
            defaultValue={accountData.login}
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
            defaultValue={accountData.name}
            id="name"
            name="name"
            label={intl.formatMessage({id: "Login.Fields.Name"})}
            type="text"
            disabled={loading}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
        />
        <div className={css.LocWrapper}>
            <InputLabel shrink id="loc-select-label">
                {intl.formatMessage({id: "Account.Loc.Label"})}
            </InputLabel>
            <Controller
                control={control}
                name="loc"
                defaultValue={accountData.loc}
                as={
                    <Select id="loc-select">
                        <MenuItem value={"ru"}>
                            {intl.formatMessage({id: "Account.Loc.Ru"})}
                        </MenuItem>
                        <MenuItem value={"en"}>
                            {intl.formatMessage({id: "Account.Loc.En"})}
                        </MenuItem>
                    </Select>
                }
            />
        </div>
        <PasswordTextField
            inputRef={register({
                required: {
                    value: isGoingToChangePassword,
                    message: intl.formatMessage({
                        id: "Login.Validation.Field.Required"})
                }
            })}
            defaultValue=""
            id="oldPassword"
            name="oldPassword"
            label={intl.formatMessage({id: "Login.Fields.OldPassword"})}
            disabled={loading}
            error={Boolean(errors.oldPassword)}
            helperText={errors.oldPassword?.message}
        />
        <PasswordTextField
            onChange={onPasswordChange}
            inputRef={register()}
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
                required: {
                    value: isGoingToChangePassword,
                    message: intl.formatMessage({
                        id: "Login.Validation.Field.Required"})
                },
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
                               locId="Account.Buttons.Save" />
        </DialogActions>
    </form>
}