import { useIntl } from "react-intl";
import {useAuth} from "../../common/hooks/useAuth";
import { useAccountState } from "../../state/useAccountState";
import {useLazyQuery} from "@apollo/client";
import {
    GetUserAccountDataResp, GetUserAccountDataVariables,
    QUERY_GET_CURRENT_ACCOUNT_DATA
} from "../../api/user/queries";
import {useEffect} from "react";

export const useAccountPage = () => {
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
    }, []);

    useEffect(() => {
        if (data) {
            updateAccountData(data?.userByLogin)
        }
    }, [data])

    return {
        intl,
        loading,
        currentAccount,
        error
    }
}