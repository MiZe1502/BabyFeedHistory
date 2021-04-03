import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from "@apollo/client/link/context";
import {
    getDataFromLocalStorageByKey,
    SESSION_TOKEN
} from "../utils/localStorage";

const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = getDataFromLocalStorageByKey(SESSION_TOKEN);

    console.log('HRE', token)
    return {
        headers: {
            ...headers,
            authorization: token || "",
        }
    }
});


export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});