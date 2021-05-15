import {gql} from "@apollo/client";
import {UserAccount} from "./queries";

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
    mutation UpdateUser($user: UpdateUserInput) {
        updateUser(user: $user) {
            login,
            name,
        }
    }
`

export interface UpdateUserResp {
    updateUser: UserAccount;
}

export interface LoginResp {
    login: string;
}

export interface RegistrationResp {
    register: {
        token: string;
    }
}

