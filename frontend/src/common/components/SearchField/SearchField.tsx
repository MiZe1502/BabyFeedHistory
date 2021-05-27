import React from "react";
import {TextFieldWrapped} from "../TextField/TextField";
import cn from "classnames";

import css from "./SearchField.scss";

interface SearchFieldProps {
    onChange: (value: string) => void;
    placeholder: string;
    id: string;
    className?: string;
}

export const SearchField = ({id, onChange, placeholder, className}: SearchFieldProps): React.ReactElement => {
    return <div className={cn(css.SearchFieldWrapper, className)}>
        <TextFieldWrapped
            placeholder={placeholder}
            onChange={(event) => onChange(event.target.value)}
            defaultValue=""
            id={id}
            type="text" />
    </div>
}