import {useAvailableFeedDetailsState} from "../../../../../../state/useAvailableFeedDetailsState";
import {useLazyQuery} from "@apollo/client";
import {
    FeedItemDetails,
    GetAvailableFeedDetailsResp,
    QUERY_GET_AVAILABLE_FEED_DETAILS
} from "../../../../../../api/feedDetails/queries";
import {useEffect, useState} from "react";
import {useAuth} from "../../../../../../common/hooks/useAuth";
import { useIntl } from "react-intl";

export const useFeedDetailsList = () => {
    const auth = useAuth();
    const intl = useIntl();

    const {availableFeedDetails, addItems} = useAvailableFeedDetailsState();

    const [currentData, setCurrentData] = useState<FeedItemDetails[]>([])

    const [getFeedDetails, { loading,
        data,
        error }] =
        useLazyQuery<GetAvailableFeedDetailsResp>(QUERY_GET_AVAILABLE_FEED_DETAILS)

    auth?.logoutIfAuthError(error);

    useEffect(() => {
        getFeedDetails();
    }, [])

    useEffect(() => {
        setCurrentData(availableFeedDetails);
    }, [availableFeedDetails])

    useEffect(() => {
        if (data) {
            addItems(data?.getAvailableFeedDetails || []);
        }
    }, [data, loading])

    const onSearch = (value: string) => {
        const slice = availableFeedDetails.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
        setCurrentData([...slice]);
    }

    const [isFeedsDetailsListOpened, setIsFeedsDetailsListOpened] = useState(false);

    const onAddNewFeedDetailsItemClick = () => {
        setIsFeedsDetailsListOpened(!isFeedsDetailsListOpened);
    }

    return {
        loading,
        error,
        availableFeedDetails,
        onAddNewFeedDetailsItemClick,
        isFeedsDetailsListOpened,
        onSearch,
        currentData,
        intl,
    }
}