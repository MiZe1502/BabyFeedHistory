import {ApolloClient, createHttpLink, InMemoryCache, split} from '@apollo/client';
import {setContext} from "@apollo/client/link/context";
import {
    getDataFromLocalStorageByKey,
    SESSION_TOKEN
} from "../utils/localStorage";
import { WebSocketLink } from '@apollo/client/link/ws';
import {getMainDefinition} from "@apollo/client/utilities";

const wsLink = new WebSocketLink({
    uri: 'ws://localhost:3000/subscriptions',
    options: {
        reconnect: true
    }
});

const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = getDataFromLocalStorageByKey(SESSION_TOKEN);
    return {
        headers: {
            ...headers,
            authorization: token || "",
        }
    }
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    authLink.concat(httpLink),
);


export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
        addTypename: false
    })
});