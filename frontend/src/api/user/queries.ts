import {gql} from "@apollo/client/core";

export const QUERY_GET_CURRENT_ACCOUNT_DATA = gql`
    query GetCurrentUserData($login: String!){
        userByLogin(login: $login){
            login,
            name,
            loc
        }
    }
`

export type Localization = "ru" | "en";

export interface GetUserAccountDataResp {
    userByLogin: UserAccount;
}

export interface UserAccount {
    login: string;
    name?: string;
    loc: Localization;
}

export interface GetUserAccountDataVariables {
    login: string;
}