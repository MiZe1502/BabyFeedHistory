import React from "react";
import Typography from "@material-ui/core/Typography";
import ErrorIcon from "@material-ui/icons/Error";

import css from "./ErrorMessage.scss";

interface ErrorMessageProps {
    showError?: boolean;
    errorMessage?: string;
}

export const ErrorMessage =
    ({showError, errorMessage}: ErrorMessageProps): React.ReactElement | null => {
    if (!showError) {
        return null;
    }
    return <Typography className={css.Wrapper}
                       color="error" variant="subtitle2" component="h6">
        <ErrorIcon className={css.ErrorIcon} color="error" fontSize="small"/>
        {errorMessage}
    </Typography>
}