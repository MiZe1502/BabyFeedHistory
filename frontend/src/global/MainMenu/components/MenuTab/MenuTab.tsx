import React from "react";
import {Tab} from "@material-ui/core";

interface MenuTabProps {
    to: string;
    label: string;
    id: string;
    onClick: () => void;
}

export const MenuTab =
    ({to, label, id, onClick}: MenuTabProps): React.ReactElement => {
    return <Tab
        label={label}
        id={id}
        component="a"
        onClick={onClick}
        href={to}
    />
}