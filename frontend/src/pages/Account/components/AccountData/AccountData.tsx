import React from "react";
import { useIntl } from "react-intl";
import {UserAccount} from "../../../../api/user/queries";
import {useForm} from "react-hook-form";
import {TextFieldWrapped} from "../../../../common/components/TextField/TextField";
import {MaxNameLength} from "../../../Login/components/SignUpForm/useSignUpForm";
import {useMutation} from "@apollo/client";

interface AccountDataProps {
    data: UserAccount;
}

interface AccountForm extends UserAccount {
    password: string;
    oldPassword: string;
}

export const AccountData = ({data}: AccountDataProps) => {
    const intl = useIntl();

    const { register, handleSubmit, formState: {
        errors
    }, getValues} = useForm<AccountForm>({})

    const [updateUser, { error, data, loading }] = useMutation();

    const onSubmit = () => {

    }

    return <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <TextFieldWrapped
            inputRef={register({
                required: intl.formatMessage({
                    id: "Login.Validation.Field.Required"}),
            })}
            defaultValue={data.login}
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
            defaultValue={data.name}
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