import React from 'react';
import {ApolloProvider, gql, useMutation} from "@apollo/client";
import {client} from "./api";

import css from "./test.scss";
import {LoginPage} from "./pages/Login/LoginPage";
import {AuthorizedApp} from "./global/AuthorizedApp/AuthorizedApp";



export const App = () => {
    return <div className={css.test}>
           <LoginPage />
     </div>
}

export const ConnectedApp = () => {
    return <ApolloProvider client={client}>
        <AuthorizedApp>
            <App/>
        </AuthorizedApp>
    </ApolloProvider>
}

export default ConnectedApp