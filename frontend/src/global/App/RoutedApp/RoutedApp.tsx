import React from 'react';
import {LoginPage} from "../../../pages/Login/LoginPage";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {routes} from "../../../utils/routes";
import {PrivateRoute} from "../../PrivateRoute/PrivateRoute";
import {HistoryPage} from "../../../pages/History/HistoryPage";
import {MainMenu} from "../../MainMenu/MainMenu";

export const RoutedApp = (): React.ReactElement => {
    return <BrowserRouter>
            <MainMenu />
            <Switch>
                <Route path={routes.auth}>
                    <LoginPage />
                </Route>
                <PrivateRoute path={routes.history}>
                    <HistoryPage />
                </PrivateRoute>
            </Switch>
        </BrowserRouter>
}
