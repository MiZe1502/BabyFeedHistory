import React from 'react';
import {LoginPage} from "../../../pages/Login/LoginPage";
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import {routes} from "../../../utils/routes";
import {PrivateRoute} from "../../PrivateRoute/PrivateRoute";
import {HistoryPage} from "../../../pages/History/HistoryPage";
import {FeedDetailsPage} from "../../../pages/FeedDetails/FeedDetailsPage";
import {MainMenu} from "../../MainMenu/MainMenu";
import {useAuth} from "../../../common/hooks/useAuth";
import {DayPage} from "../../../pages/Day/DayPage";
import {AccountPage} from "../../../pages/Account/AccountPage";
import css from "./RoutedApp.scss";

export const RoutedApp = (): React.ReactElement => {
    const auth = useAuth();

    return <BrowserRouter>
        {auth?.token && <MainMenu />}
        <div className={css.Content}>
            <Switch>
                <Route path={routes.auth}>
                    <LoginPage />
                </Route>
                <PrivateRoute path={routes.dayInHistory}>
                    <DayPage />
                </PrivateRoute>
                <PrivateRoute path={routes.history}>
                    <HistoryPage />
                </PrivateRoute>
                <PrivateRoute path={routes.feedDetails}>
                    <FeedDetailsPage />
                </PrivateRoute>
                <PrivateRoute path={routes.account}>
                    <AccountPage />
                </PrivateRoute>
                <Redirect from="*" to={routes.history} />
            </Switch>
        </div>
    </BrowserRouter>
}
