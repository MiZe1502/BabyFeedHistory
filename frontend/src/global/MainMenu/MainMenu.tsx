import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import React, {useEffect} from "react";
import {MenuTab} from "./components/MenuTab/MenuTab";
import {routes} from "../../utils/routes";
import {AvatarBlock} from "./components/AvatarBlock/AvatarBlock";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";

import css from "./MainMenu.scss";


export const MainMenu = (): React.ReactElement => {
    const [value, setValue] = React.useState(0);
    const intl = useIntl();

    const location = useLocation();

    const tabs = [routes.history, routes.feedDetails];

    useEffect(() => {
        const index = location.pathname.lastIndexOf('/');
        const loc = index > 0 ? location.pathname.substring(0, index) : location.pathname;
        const currentRouteIndex = tabs.findIndex((tab) => tab === loc);
        setValue(currentRouteIndex);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    const handleChange = (event: React.ChangeEvent<Record<string, unknown>>,
                          newValue: number) => {
        setValue(newValue);
    };

    const onClick = (route: string, value: number) => {
        setValue(value);
    }

    return <AppBar position="static">
        <div className={css.ScrollPreserver}/>
        <div className={css.MenuInnerWrapper}>
            <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
            >
                <MenuTab onClick={onClick} value={0}
                         label={intl.formatMessage({id: "Menu.Tabs.History"})}
                         to={routes.history}
                         id={'nav-tab-0'} />
                <MenuTab onClick={onClick} value={1}
                         label={intl.formatMessage({id: "Menu.Tabs.FeedDetails"})}
                         to={routes.feedDetails}
                         id={'nav-tab-1'}/>
            </Tabs>
            <AvatarBlock />
        </div>
    </AppBar>
}