import {ApolloProvider} from "@apollo/client";
import {client} from "../../../api";
import {AuthorizedApp} from "../AuthorizedApp/AuthorizedApp";
import {IntlProvider} from "react-intl";
import {en} from "../../../loc/en";
import React from "react";
import {RoutedApp} from "../RoutedApp/RoutedApp";

export const ConnectedApp = (): React.ReactElement => {
    return <ApolloProvider client={client}>
        <AuthorizedApp>
            <IntlProvider messages={en} locale="en" defaultLocale="en">
                <RoutedApp/>
            </IntlProvider>
        </AuthorizedApp>
    </ApolloProvider>
}

export default ConnectedApp;