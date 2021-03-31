import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import {MenuTab} from "./components/MenuTab/MenuTab";
import {routes} from "../../utils/routes";
import PersonIcon from '@material-ui/icons/Person';

import css from "./MainMenu.scss";
import {AvatarBlock} from "./components/AvatarBlock/AvatarBlock";

export const MainMenu = (): React.ReactElement => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<Record<string, unknown>>,
                          newValue: number) => {
        setValue(newValue);
    };

    const onClick = (route: string, value: number) => {
        setValue(value);
    }

    return <AppBar position="static">
        <div className={css.MenuInnerWrapper}>
            <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
            >
                <MenuTab onClick={onClick} value={0}
                         label="History" to={routes.history} id={'nav-tab-0'} />
                <MenuTab onClick={onClick} value={1}
                         label="Settings" to={routes.settings} id={'nav-tab-1'}/>
            </Tabs>
            <AvatarBlock />
        </div>
    </AppBar>
}