import {useAuth} from "../../common/hooks/useAuth";
import {useIntl} from "react-intl";
import {useAvailableFeedDetailsState} from "../../state/useAvailableFeedDetailsState";
import {useLazyQuery} from "@apollo/client";
import {
    GetAvailableFeedDetailsResp,
    QUERY_GET_AVAILABLE_FEED_DETAILS
} from "../../api/feedDetails/queries";
import {useEffect} from "react";

export const useFeedDetailsPage = () => {
    const auth = useAuth();
    const intl = useIntl();

    const {availableFeedDetails, addItems} = useAvailableFeedDetailsState();

    const [getFeedDetails, {loading, data, error}] = useLazyQuery<GetAvailableFeedDetailsResp>(QUERY_GET_AVAILABLE_FEED_DETAILS)

    auth?.logoutIfAuthError(error);

    useEffect(() => {
        getFeedDetails();
    }, [])

    useEffect(() => {
        if (data) {
            addItems(data?.getAvailableFeedDetails || []);
        }
    }, [data])

    return {
        intl,
        loading,
        data,
        availableFeedDetails,
        error,
    }
}