import React from "react";

import css from "./SearchField.scss";
import {TextFieldWrapped} from "../TextField/TextField";

interface SearchFieldProps {
    onChange: (value: string) => void;
    placeholder: string;
    id: string;
}

export const SearchField = ({id, onChange, placeholder}: SearchFieldProps) => {
    return <div className={css.SearchFieldWrapper}>
        <TextFieldWrapped
            placeholder={placeholder}
            onChange={(event) => onChange(event.target.value)}
            defaultValue=""
            id={id}
            type="text" />
    </div>
}