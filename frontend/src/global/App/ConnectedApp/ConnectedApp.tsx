import {ApolloProvider} from "@apollo/client";
import {client} from "../../../api";
import {AuthorizedApp} from "../AuthorizedApp/AuthorizedApp";
import {IntlProvider} from "react-intl";
import {en} from "../../../loc/en";
import React from "react";
import {RecoilRoot} from "recoil";
import { StatedApp } from "../StatedApp/StatedApp";
import {IntlApp} from "../IntlApp/IntlApp";

export const ConnectedApp = (): React.ReactElement => {
    return <ApolloProvider client={client}>
        <AuthorizedApp>
            <IntlApp />
            {/*<IntlProvider messages={en} locale="en" defaultLocale="en">*/}
            {/*    <RecoilRoot>*/}
            {/*        <StatedApp />*/}
            {/*    </RecoilRoot>*/}
            {/*</IntlProvider>*/}
        </AuthorizedApp>
    </ApolloProvider>
}

export default ConnectedApp;