import {useIntl} from "react-intl";
import {useAuth} from "../../../../common/hooks/useAuth";
import {useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {
    MUTATION_UPDATE_USER_DATA,
    UpdateUserResp
} from "../../../../api/user/mutations";
import {
    addDataToLocalStorage, CURRENT_LOC, CURRENT_LOGIN,
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAccountData = () => {
    const intl = useIntl();
    const auth = useAuth();

    const { control, register, handleSubmit, formState: {
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
                    throw new Error('Unexpected error');
                }

                auth?.updateToken(res.data.updateUser.token || "")
                auth?.updateLogin(res.data.updateUser.login)
                auth?.updateLoc(res.data.updateUser.loc)

                addDataToLocalStorage(SESSION_TOKEN, res.data.updateUser.token || "")
                addDataToLocalStorage(CURRENT_LOGIN, res.data.updateUser.login)
                addDataToLocalStorage(CURRENT_LOC, res.data.updateUser.loc);
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
        control,
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