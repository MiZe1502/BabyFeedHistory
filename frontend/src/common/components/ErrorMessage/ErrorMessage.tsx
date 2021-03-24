import React from "react";
import {Typography} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";

import css from "./ErrorMessage.scss";

interface ErrorMessageProps {
    showError?: boolean;
    errorMessage?: string;
}

export const ErrorMessage = ({showError, errorMessage}: ErrorMessageProps) => {
    if (!showError) {
        return null;
    }
    return <Typography className={css.FlexHorCenter} color="error" variant="subtitle2" component="h6">
        <ErrorIcon className={css.ErrorIcon} color="error" fontSize="small"/>
        {errorMessage}
    </Typography>
}