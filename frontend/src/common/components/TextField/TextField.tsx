import React from "react";
import {TextField, TextFieldProps} from "@material-ui/core";

import css from "./TextField.scss";

export const TextFieldWrapped = (props: TextFieldProps): React.ReactElement => {
    return <div className={css.FieldWrapper}>
        <TextField
            {...props}
            autoFocus
            margin="dense"
            fullWidth
        />
    </div>
}