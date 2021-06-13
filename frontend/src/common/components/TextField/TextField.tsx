import React, {useState} from "react";
import TextField, {TextFieldProps} from "@material-ui/core/TextField";
import InputMask from "react-input-mask";

import css from "./TextField.scss";

export type TextFieldWrappedProps = TextFieldProps & {
    mask?: string;
}

export const TextFieldWrapped = (props: TextFieldWrappedProps): React.ReactElement => {
    const [value, setValue] = useState(props.defaultValue as string)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    return <div className={css.FieldWrapper}>
        {props.mask ? <InputMask
            onChange={onChange}
            mask={props.mask}
            value={value}
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