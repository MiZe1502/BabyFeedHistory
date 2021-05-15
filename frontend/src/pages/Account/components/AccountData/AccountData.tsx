import React from "react";
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

interface AccountDataProps {
    accountData: UserAccount;
}

interface AccountForm extends UserAccount {
    password?: string;
    oldLogin?: string;
    oldPassword?: string;
}

export const AccountData = ({accountData}: AccountDataProps) => {
    const intl = useIntl();

    const { register, handleSubmit, formState: {
        errors
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
    </form>
}