import {
    Button, CircularProgress,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, TextField, Typography
} from "@material-ui/core";
import React from "react";
import ErrorIcon from '@material-ui/icons/Error';
import css from "./LoginPage.scss"
import { FormattedMessage } from "react-intl";
import {useLoginPage} from "./useLoginPage";
import {ButtonWithLoading} from "../../common/components/ButtonWithLoading/ButtonWithLoading";

export const LoginPage = () => {
    const {
        handleSubmit,
        register,
        onSubmit,
        loading,
        errors,
        intl,
        error,
    } = useLoginPage();

    return <Dialog open={true} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <FormattedMessage id="Login.Title" />
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                    <div className={css.FieldWrapper}>
                        <TextField
                            inputRef={register({
                                required: intl.formatMessage({id: "Login.Validation.Field.Required"}),
                            })}
                            autoFocus
                            margin="dense"
                            defaultValue=""
                            id="login"
                            name="login"
                            label={intl.formatMessage({id: "Login.Fields.Login"})}
                            type="email"
                            fullWidth
                            disabled={loading}
                            error={Boolean(errors.login)}
                            helperText={errors.login?.message}
                        />
                    </div>
                    <div className={css.FieldWrapper}>
                        <TextField
                            inputRef={register({
                                required: intl.formatMessage({id: "Login.Validation.Field.Required"}),
                            })}
                            autoFocus
                            defaultValue=""
                            margin="dense"
                            id="password"
                            name="password"
                            label={intl.formatMessage({id: "Login.Fields.Password"})}
                            type="password"
                            fullWidth
                            disabled={loading}
                            error={Boolean(errors.password)}
                            helperText={errors.password?.message}
                        />
                    </div>
                    {error && <Typography className={css.FlexHorCenter} color="error" variant="subtitle2" component="h6">
                        <ErrorIcon className={css.ErrorIcon} color="error" fontSize="small"/>
                            {error.message}
                    </Typography>}
                    <DialogActions>
                        <ButtonWithLoading loading={loading} locId="Login.Buttons.SignIn" />
                        <Button onClick={() => {}} color="secondary">
                            <FormattedMessage id="Login.Buttons.SignUp" />
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>;
}