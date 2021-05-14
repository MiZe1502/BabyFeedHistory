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

export const MUTATION_UPDATE_USER_DATA = gql`
    mutation UpdateUser() {
        updateUser(user: {
            oldLogin: "abs updated login 2",
            login: "abs updated login 2",
            name: "updated name 3"
        }) {
            login,
            name,
            password,
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

