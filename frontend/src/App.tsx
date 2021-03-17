import React from 'react';
import {ApolloProvider, gql, useMutation} from "@apollo/client";
import {client} from "./api";

import css from "./test.scss";

const MUTATION_AUTH = gql`
    mutation Auth($login: String!, $password: String!) {
        login(login: $login, password: $password)
    }
`

export const App = () => {
    const [auth, data] = useMutation(MUTATION_AUTH);

    auth({ variables: { login: "abs updated login 2", password: "qwerty12" } })
        .then((res) => console.log(res));

    console.log(data)
    return <div className={css.test}>
            My App Component
        </div>
}

export const ConnectedApp = () => {
    return <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
}

export default ConnectedApp