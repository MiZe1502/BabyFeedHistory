import React, {useState} from "react";
import { useIntl } from "react-intl";
import {UserAccount} from "../../../../api/user/queries";
import {useForm} from "react-hook-form";
import {TextFieldWrapped} from "../../../../common/components/TextField/TextField";
import {MaxNameLength} from "../../../Login/components/SignUpForm/useSignUpForm";
import {useMutation} from "@apollo/client";
import {MUTATION_UPDATE_USER_DATA} from "../../../../api/user/mutations";
import {
    addDataToLocalStorage,
    CURRENT_LOGIN
} from "../../../../utils/localStorage";
import {PasswordTextField} from "../../../../common/components/PasswordTextField/PasswordTextField";
import {ErrorMessage} from "../../../../common/components/ErrorMessage/ErrorMessage";
import DialogActions from "@material-ui/core/DialogActions";
import {ButtonWithLoading} from "../../../../common/components/ButtonWithLoading/ButtonWithLoading";

interface AccountDataProps {
    accountData: UserAccount;
}

interface AccountForm extends UserAccount {
    password?: string;
    oldLogin?: string;
    oldPassword?: string;
    confirmPassword?: string;
}

export const AccountData = ({accountData}: AccountDataProps) => {
    const intl = useIntl();

    const { register, handleSubmit, formState: {
        errors,
    }, getValues} = useForm<AccountForm>({})

    const [updateUser, { error, data, loading }] = useMutation<AccountForm>(MUTATION_UPDATE_USER_DATA);

    const onSubmit = (user: AccountForm) => {
        updateUser({
            variables: { user }
        })
        .then((res) => {
            if (!res?.data) {
                throw 'Unexpected error'
            }
            addDataToLocalStorage(CURRENT_LOGIN, res.data.login)
        })
        .catch((err) => {
            console.log(err)
        });
    }

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value?.length > 0 && !isGoingToChangePassword) {
            setIsGoingToChangePassword(true);
        } else if (!event.target.value && isGoingToChangePassword) {
            setIsGoingToChangePassword(false);
        }
    }

    const [isGoingToChangePassword, setIsGoingToChangePassword] = useState(false);

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