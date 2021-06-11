import {useIntl} from "react-intl";
import {useAuth} from "../../../../common/hooks/useAuth";
import {useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {
    MUTATION_UPDATE_USER_DATA,
    UpdateUserResp
} from "../../../../api/user/mutations";
import React, {useState} from "react";
import {UserAccount} from "../../../../api/user/queries";
import {useAccountState} from "../../../../state/useAccountState";

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

    const {
        clearAccountData
    } = useAccountState();

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

            clearAccountData();
            auth?.updateLoc(res?.data?.updateUser.loc);
            auth?.logout();
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