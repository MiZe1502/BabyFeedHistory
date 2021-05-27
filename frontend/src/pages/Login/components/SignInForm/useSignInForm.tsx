import {useIntl} from "react-intl";
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useAuth} from "../../../../common/hooks/useAuth";
import {useMutation} from "@apollo/client";
import {LoginResp, MUTATION_AUTH} from "../../../../api/user/mutations";
import {routes} from "../../../../utils/routes";

export interface LoginForm {
    login: string;
    password: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useSignInForm = () => {
    const auth = useAuth();
    const intl = useIntl();
    const history = useHistory();

    const { register, handleSubmit, formState: {
        errors
    } } = useForm<LoginForm>({
    });

    const [authMethod, { error, data, loading }] =
        useMutation<LoginResp>(MUTATION_AUTH);

    const signIn = (login: string, password: string) => {
        authMethod({ variables: { login, password } })
            .then((res) => {
                const {token, loc} = res?.data?.login || {};
                if (!token || !loc) {
                    throw new Error('Unexpected error occurred');
                }
                auth?.updateAuthData(token, login, loc);
            })
            .then(() => history.push(routes.history))
            .catch((err) => {
                console.log(err)
            });
    }

    const onSubmit = (data: LoginForm) => {
        signIn(data.login, data.password);
    }

    return {
        auth,
        intl,
        register,
        handleSubmit,
        errors,
        error,
        data,
        loading,
        onSubmit,
    }
}