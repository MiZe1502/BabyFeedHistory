import {useIntl} from "react-intl";
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useAuth} from "../../../../common/hooks/useAuth";
import {useMutation} from "@apollo/client";
import {LoginResp, MUTATION_AUTH} from "../../api";
import {
    addDataToLocalStorage,
    SESSION_TOKEN
} from "../../../../utils/localStorage";
import {routes} from "../../../../utils/routes";

export interface LoginForm {
    login: string;
    password: string;
}

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
                auth?.updateToken(res?.data?.login || "")
                addDataToLocalStorage(SESSION_TOKEN, res?.data?.login || "")
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