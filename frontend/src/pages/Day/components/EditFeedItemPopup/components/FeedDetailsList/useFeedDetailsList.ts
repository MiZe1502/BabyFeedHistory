import {useAvailableFeedDetailsState} from "../../../../../../state/useAvailableFeedDetailsState";
import {ApolloError, useLazyQuery} from "@apollo/client";
import {
    FeedItemDetails,
    GetAvailableFeedDetailsResp,
    QUERY_GET_AVAILABLE_FEED_DETAILS
} from "../../../../../../api/feedDetails/queries";
import {useEffect, useState} from "react";
import {useAuth} from "../../../../../../common/hooks/useAuth";
import {IntlShape, useIntl } from "react-intl";

interface UseFeedDetailsListRet {
    loading: boolean;
    error?: ApolloError;
    availableFeedDetails: FeedItemDetails[];
    onAddNewFeedDetailsItemClick: () => void;
    isFeedsDetailsListOpened: boolean;
    onSearch: (value: string) => void;
    currentData: FeedItemDetails[];
    intl: IntlShape;
}

export const useFeedDetailsList = (): UseFeedDetailsListRet => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setCurrentData(availableFeedDetails);
    }, [availableFeedDetails])

    useEffect(() => {
        if (data) {
            addItems(data?.getAvailableFeedDetails || []);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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