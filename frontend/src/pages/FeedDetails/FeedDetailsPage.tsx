import React, {useEffect} from "react";

import css from "./FeedDetailsPage.scss";
import {useLazyQuery} from "@apollo/client";
import {
    FeedItemDetails,
    QUERY_GET_AVAILABLE_FEED_DETAILS
} from "../../api/feedDetails/queries";
import {useAvailableFeedDetailsState} from "../../state/useAvailableFeedDetailsState";
import CircularProgress from "@material-ui/core/CircularProgress";

export const FeedDetailsPage = () => {
    const {addItem,
        updateItem,
        removeItemByKey,
        availableFeedDetails, addItems} = useAvailableFeedDetailsState();

    const [getFeedDetails, {loading, data, error}] = useLazyQuery<FeedItemDetails[]>(QUERY_GET_AVAILABLE_FEED_DETAILS)

    useEffect(() => {
        getFeedDetails();
    })

    useEffect(() => {
        if (!loading && data) {
            addItems(data);
        }
    }, [data, loading])

    if (loading) {
        return <div className={css.FeedDetailsPage}>
            <CircularProgress size={54} disableShrink />
        </div>
    }

    return <div className={css.FeedDetailsPage}>
        SETTINGS
    </div>
}