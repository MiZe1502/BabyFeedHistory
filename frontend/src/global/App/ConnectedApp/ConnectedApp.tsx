import {ApolloProvider} from "@apollo/client";
import {client} from "../../../api";
import {AuthorizedApp} from "../AuthorizedApp/AuthorizedApp";
import React from "react";
import {IntlApp} from "../IntlApp/IntlApp";

export const ConnectedApp = (): React.ReactElement => {
    return <ApolloProvider client={client}>
        <AuthorizedApp>
            <IntlApp />
        </AuthorizedApp>
    </ApolloProvider>
}

export default ConnectedApp;