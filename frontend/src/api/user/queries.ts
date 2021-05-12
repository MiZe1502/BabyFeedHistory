import {gql} from "@apollo/client/core";

export const QUERY_GET_CURRENT_ACCOUNT_DATA = gql`
    query GetCurrentUserData($login: String!){
        userByLogin(login: $login){
            login,
            name
        }
    }
`

export interface GetUserAccountDataResp {
    userByLogin: UserAccount;
}

export interface UserAccount {
    login: string;
    name?: string;
}

export interface GetUserAccountDataVariables {
    login: string;
}