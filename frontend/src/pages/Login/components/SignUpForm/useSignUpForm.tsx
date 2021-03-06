import {useIntl} from "react-intl";
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useAuth} from "../../../../common/hooks/useAuth";
import {useMutation} from "@apollo/client";
import {
    MUTATION_REGISTRATION,
    RegistrationResp
} from "../../../../api/user/mutations";
import {routes} from "../../../../utils/routes";
import {LoginForm} from "../SignInForm/useSignInForm";

interface RegistrationForm extends LoginForm {
    confirmPassword: string;
    name?: string;
}

export const MaxNameLength = 256;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useSignUpForm = () => {
    const auth = useAuth();
    const intl = useIntl();
    const history = useHistory();

    const { register, handleSubmit, formState: {
        errors
    }, getValues } = useForm<RegistrationForm>({
    });

    const [regMethod, { error, data, loading }] =
        useMutation<RegistrationResp>(MUTATION_REGISTRATION);

    const signUp = (user: RegistrationForm) => {
        regMethod({ variables: { user }})
            .then((res) => {
                const {token, loc} = res?.data?.register || {};
                if (!token || !loc) {
                    throw new Error('Unexpected error occurred');
                }
                auth?.updateAuthData(token, user.login, loc);
            })
            .then(() => history.push(routes.history))
            .catch((err) => {
                console.log(err)
            });
    }

    const onSubmit = (data: RegistrationForm) => {
        signUp(data as RegistrationForm)
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
        getValues,
    }
}