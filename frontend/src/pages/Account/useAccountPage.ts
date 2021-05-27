import {IntlShape, useIntl } from "react-intl";
import {useAuth} from "../../common/hooks/useAuth";
import { useAccountState } from "../../state/useAccountState";
import {ApolloError, useLazyQuery} from "@apollo/client";
import {
    GetUserAccountDataResp, GetUserAccountDataVariables,
    QUERY_GET_CURRENT_ACCOUNT_DATA, UserAccount
} from "../../api/user/queries";
import {useEffect} from "react";

interface UseAccountPageRet {
    intl: IntlShape;
    loading: boolean;
    currentAccount: UserAccount | null;
    error?: ApolloError
}

export const useAccountPage = (): UseAccountPageRet => {
    const auth = useAuth();
    const intl = useIntl();

    const {
        currentAccount,
        updateAccountData
    } = useAccountState();

    const [getAccountData, {
        loading,
        data,
        error
    }] = useLazyQuery<GetUserAccountDataResp,
        GetUserAccountDataVariables>(QUERY_GET_CURRENT_ACCOUNT_DATA)

    auth?.logoutIfAuthError(error);

    useEffect(() => {
        getAccountData({
            variables: {
                login: auth?.login || ""
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (data) {
            updateAccountData(data?.userByLogin)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return {
        intl,
        loading,
        currentAccount,
        error
    }
}