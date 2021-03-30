import React from "react";
import Tab from "@material-ui/core/Tab";
import {Link} from "react-router-dom";

interface MenuTabProps {
    to: string;
    label: string;
    id: string;
    value: number;
    onClick: (route: string, value: number) => void;
}

export const MenuTab =
    ({to, label, id, onClick, value}: MenuTabProps): React.ReactElement => {
     return <Tab
        value={value}
        label={label}
        id={id}
        onClick={() => onClick(to, value)}
        href={to}
    >
         <Link to={to}/>
     </Tab>
}