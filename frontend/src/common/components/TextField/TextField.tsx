import React from "react";
import TextField, {TextFieldProps} from "@material-ui/core/TextField";
import InputMask from "react-input-mask";

import css from "./TextField.scss";

export type TextFieldWrappedProps = TextFieldProps & {
    mask?: string;
}

export const TextFieldWrapped = (props: TextFieldWrappedProps): React.ReactElement => {
    return <div className={css.FieldWrapper}>
        {props.mask ? <InputMask
            mask={props.mask}
            value={props.value as string}
            disabled={props.disabled}
            maskPlaceholder={" "}
        >
            {() => <TextField
            {...props}
            autoFocus
            margin="dense"
            fullWidth
        />}
        </InputMask> : <TextField
            {...props}
            autoFocus
            margin="dense"
            fullWidth
        />}
    </div>
}