import React from 'react';
import {LoginPage} from "../../../pages/Login/LoginPage";
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import {routes} from "../../../utils/routes";
import {PrivateRoute} from "../../PrivateRoute/PrivateRoute";
import {HistoryPage} from "../../../pages/History/HistoryPage";
import {SettingsPage} from "../../../pages/Settings/SettingsPage";

export const RoutedApp = (): React.ReactElement => {
    return <BrowserRouter>
        <Switch>
            <Route path={routes.auth}>
                <LoginPage />
            </Route>
            <PrivateRoute path={routes.history}>
                <HistoryPage />
            </PrivateRoute>
            <PrivateRoute path={routes.settings}>
                <SettingsPage />
            </PrivateRoute>
        </Switch>
    </BrowserRouter>
}
