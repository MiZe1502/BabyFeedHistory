import {useAuth} from "../../common/hooks/useAuth";
import {IntlShape, useIntl} from "react-intl";
import {useAvailableFeedDetailsState} from "../../state/useAvailableFeedDetailsState";
import {ApolloError, useLazyQuery} from "@apollo/client";
import {
    FeedItemDetails,
    GetAvailableFeedDetailsResp,
    QUERY_GET_AVAILABLE_FEED_DETAILS
} from "../../api/feedDetails/queries";
import {useEffect, useState} from "react";

interface UseFeedDetailsPageRet {
    intl: IntlShape;
    loading: boolean;
    data?: GetAvailableFeedDetailsResp;
    availableFeedDetails: FeedItemDetails[];
    error?: ApolloError;
    onSearch: (value: string) => void;
    currentData: FeedItemDetails[];
}

export const useFeedDetailsPage = (): UseFeedDetailsPageRet => {
    const auth = useAuth();
    const intl = useIntl();

    const {availableFeedDetails, addItems} = useAvailableFeedDetailsState();

    const [currentData, setCurrentData] = useState<FeedItemDetails[]>([])

    const [getFeedDetails, {
        loading,
        data,
        error
    }] = useLazyQuery<GetAvailableFeedDetailsResp>(QUERY_GET_AVAILABLE_FEED_DETAILS)

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
    }, [data])

    const onSearch = (value: string) => {
        const slice = availableFeedDetails.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
        setCurrentData([...slice]);
    }

    return {
        intl,
        loading,
        data,
        availableFeedDetails,
        error,
        onSearch,
        currentData,
    }
}