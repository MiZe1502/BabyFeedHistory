import React from 'react';
import {LoginPage} from "../../../pages/Login/LoginPage";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {routes} from "../../../utils/routes";
import {PrivateRoute} from "../../PrivateRoute/PrivateRoute";
import {HistoryPage} from "../../../pages/History/HistoryPage";

export const RoutedApp = () => {
    return <BrowserRouter>
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
