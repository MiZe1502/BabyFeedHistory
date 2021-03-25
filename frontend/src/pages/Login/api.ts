import {gql} from "@apollo/client";

export const MUTATION_AUTH = gql`
    mutation Auth($login: String!, $password: String!) {
        login(login: $login, password: $password)
    }
`

export const MUTATION_REGISTRATION = gql`
    mutation CreateUser($user: UserInput!) {
        register(user: $user) {
            token
        }
    }
`

export interface LoginResp {
    login: string;
}

export interface RegistrationResp {
    register: {
        token: string;
    }
}

