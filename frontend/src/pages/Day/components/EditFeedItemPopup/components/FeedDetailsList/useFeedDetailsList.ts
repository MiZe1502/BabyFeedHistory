import {useAvailableFeedDetailsState} from "../../../../../FeedDetails/state";
import {useLazyQuery} from "@apollo/client";
import {
    GetAvailableFeedDetailsResp,
    QUERY_GET_AVAILABLE_FEED_DETAILS
} from "../../../../../../api/feedDetails/queries";
import {useEffect, useState} from "react";

export const useFeedDetailsList = () => {
    const {availableFeedDetails, addItems} = useAvailableFeedDetailsState();

    const [getFeedDetails, { loading,
        data,
        error }] =
        useLazyQuery<GetAvailableFeedDetailsResp>(QUERY_GET_AVAILABLE_FEED_DETAILS)

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