import {AppBar, Tabs} from "@material-ui/core";
import React from "react";
import {MenuTab} from "./components/MenuTab/MenuTab";
import {routes} from "../../utils/routes";
import { useHistory } from "react-router-dom";


export const MainMenu = (): React.ReactElement => {
    const [value, setValue] = React.useState(0);
    // const history = useHistory();

    const handleChange = (event: React.ChangeEvent<Record<string, unknown>>,
                          newValue: number) => {
        setValue(newValue);
    };

    const onClick = (route: string, value: number) => {
        setValue(value);
        // history.push(route)
    }

    // console.log(history)

    return <AppBar position="static">
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
    </AppBar>
}