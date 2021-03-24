import React from 'react';
import {ApolloProvider} from "@apollo/client";
import {client} from "./api";

import {LoginPage} from "./pages/Login/LoginPage";
import {AuthorizedApp} from "./global/AuthorizedApp/AuthorizedApp";
import { IntlProvider } from 'react-intl';
import {en} from "./loc/en";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {routes} from "./utils/routes";
import {PrivateRoute} from "./global/PrivateRoute/PrivateRoute";
import {HistoryPage} from "./pages/History/HistoryPage";

export const App = () => {
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

export const ConnectedApp = () => {
    return <ApolloProvider client={client}>
        <AuthorizedApp>
            <IntlProvider messages={en} locale="en" defaultLocale="en">
                <App/>
            </IntlProvider>
        </AuthorizedApp>
    </ApolloProvider>
}

export default ConnectedApp