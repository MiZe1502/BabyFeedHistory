import {gql} from "@apollo/client";
import {Localization, UserAccount} from "./queries";

export const MUTATION_AUTH = gql`
    mutation Auth($login: String!, $password: String!) {
        login(login: $login, password: $password) {
            token
            loc
        }
    }
`

export const MUTATION_REGISTRATION = gql`
    mutation CreateUser($user: UserInput!) {
        register(user: $user) {
            token
            loc
        }
    }
`

export const MUTATION_UPDATE_USER_DATA = gql`
    mutation UpdateUser($user: UpdateUserInput) {
        updateUser(user: $user) {
            login,
            name,
            loc,
        }
    }
`

export interface UpdateUserResp {
    updateUser: UserAccountUpdated;
}

export interface UserAccountUpdated extends UserAccount {
    token: string;
}

export interface LoginResp {
    login: {
        token: string;
        loc: Localization;
    };
}

export interface RegistrationResp {
    register: {
        token: string;
        loc: Localization;
    }
}

