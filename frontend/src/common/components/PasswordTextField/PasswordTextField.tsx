import {
    IconButton,
    InputAdornment,
    TextField,
    TextFieldProps
} from "@material-ui/core";
import css from "../TextField/TextField.scss";
import React, {useState} from "react";
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

export const PasswordTextField = (props: TextFieldProps): React.ReactElement => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return <div className={css.FieldWrapper}>
        <TextField
            {...props}
            autoFocus
            type={showPassword ? "text" : "password"}
            margin="dense"
            fullWidth
            InputProps={{
                endAdornment: <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                    >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>,
            }}
        />
    </div>
}