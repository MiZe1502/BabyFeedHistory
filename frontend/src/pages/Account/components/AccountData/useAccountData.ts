import {useIntl} from "react-intl";
import {useAuth} from "../../../../common/hooks/useAuth";
import {useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {
    MUTATION_UPDATE_USER_DATA,
    UpdateUserResp
} from "../../../../api/user/mutations";
import {
    addDataToLocalStorage, CURRENT_LOGIN,
    SESSION_TOKEN
} from "../../../../utils/localStorage";
import React, {useState} from "react";
import {UserAccount} from "../../../../api/user/queries";

interface AccountForm extends UserAccount {
    password?: string;
    oldLogin?: string;
    oldPassword?: string;
    confirmPassword?: string;
}

export const useAccountData = () => {
    const intl = useIntl();
    const auth = useAuth();

    const { register, handleSubmit, formState: {
        errors,
    }, getValues} = useForm<AccountForm>({})

    const [updateUser, { error, loading }] = useMutation<UpdateUserResp>(MUTATION_UPDATE_USER_DATA);

    const onSubmit = (user: AccountForm) => {
        updateUser({
            variables: { user: {
                    ...user,
                    oldLogin: auth?.login
                } }
        })
            .then((res) => {
                if (!res?.data?.updateUser) {
                    throw 'Unexpected error'
                }

                auth?.updateToken(res.data.updateUser.token || "")
                auth?.updateLogin(res.data.updateUser.login)
                addDataToLocalStorage(SESSION_TOKEN,
                    res.data.updateUser.token || "")
                addDataToLocalStorage(CURRENT_LOGIN, res.data.updateUser.login)
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

    return {
        intl,
        register,
        handleSubmit,
        onSubmit,
        loading,
        errors,
        isGoingToChangePassword,
        error,
        onPasswordChange,
        getValues
    }
}