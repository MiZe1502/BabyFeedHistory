import {gql} from "@apollo/client";

export const MUTATION_AUTH = gql`
    mutation Auth($login: String!, $password: String!) {
        login(login: $login, password: $password)
    }
`

export interface LoginResp {
    login: string;
}

