import React from "react";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

interface CheckedIndicatorProps {
    type: string;
    wasGiven?: boolean;
}

export const CheckedIndicator = ({type, wasGiven}: CheckedIndicatorProps) => {
    if (type === "checkedValue") {
        if (wasGiven) {
            return <CheckBoxIcon />
        } else {
            return <CheckBoxOutlineBlankIcon />
        }
    }

    return null;
}