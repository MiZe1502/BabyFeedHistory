import {useAvailableFeedDetailsState} from "../../../../../../state/useAvailableFeedDetailsState";
import {useLazyQuery} from "@apollo/client";
import {
    GetAvailableFeedDetailsResp,
    QUERY_GET_AVAILABLE_FEED_DETAILS
} from "../../../../../../api/feedDetails/queries";
import {useEffect, useState} from "react";
import {useAuth} from "../../../../../../common/hooks/useAuth";

export const useFeedDetailsList = () => {
    const auth = useAuth();

    const {availableFeedDetails, addItems} = useAvailableFeedDetailsState();

    const [getFeedDetails, { loading,
        data,
        error }] =
        useLazyQuery<GetAvailableFeedDetailsResp>(QUERY_GET_AVAILABLE_FEED_DETAILS)

    auth?.logoutIfAuthError(error);

    useEffect(() => {
        getFeedDetails();
    }, [])

    useEffect(() => {
        if (data) {
            addItems(data?.getAvailableFeedDetails || []);
        }
    }, [data, loading])

    const [isFeedsDetailsListOpened, setIsFeedsDetailsListOpened] = useState(false);

    const onAddNewFeedDetailsItemClick = () => {
        setIsFeedsDetailsListOpened(!isFeedsDetailsListOpened);
    }

    return {
        loading,
        error,
        availableFeedDetails,
        onAddNewFeedDetailsItemClick,
        isFeedsDetailsListOpened
    }
}