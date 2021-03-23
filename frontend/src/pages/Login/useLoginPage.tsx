import {useAuth} from "../../common/hooks/useAuth";
import {useIntl} from "react-intl";
import {useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {LoginResp, MUTATION_AUTH} from "./api";
import { useHistory } from "react-router-dom";
import {routes} from "../../utils/routes";

interface LoginForm {
    login: string;
    password: string;
}

// signIn("abs updated login 2", "qwerty12")

export const useLoginPage = () => {
    const auth = useAuth();
    const intl = useIntl();
    const history = useHistory();

    const { register, handleSubmit, formState: {
        errors
    } } = useForm<LoginForm>({
    });

    const [authMethod, { error, data, loading }] = useMutation<LoginResp>(MUTATION_AUTH);

    const signIn = (login: string, password: string) => {
        authMethod({ variables: { login, password } })
            .then((res) => {
                console.log(auth, res, data)
                auth?.updateToken(res?.data?.login || "")
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
        signIn,
        error,
        data,
        loading,
        onSubmit,
    }
}