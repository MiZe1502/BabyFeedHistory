import {useAvailableFeedDetailsState} from "../../../state/useAvailableFeedDetailsState";
import {useSubscription} from "@apollo/client";
import {
    FeedDetailsCreatedSubscrResp,
    FeedDetailsRemovedSubscrResp,
    FeedDetailsUpdatedSubscrResp,
    SUBSCRIPTION_FEED_DETAILS_CREATED, SUBSCRIPTION_FEED_DETAILS_REMOVED,
    SUBSCRIPTION_FEED_DETAILS_UPDATED
} from "../../../api/feedDetails/subscriptions";
import {useEffect} from "react";

export const useFeedDetailsSubscriptions = () => {
    const {addItem,
        updateItem,
        removeItemByKey} = useAvailableFeedDetailsState();

    const { data: created,
        loading: createdLoading
    } = useSubscription<FeedDetailsCreatedSubscrResp>(
        SUBSCRIPTION_FEED_DETAILS_CREATED
    );

    const { data: updated,
        loading: updatedLoading
    } = useSubscription<FeedDetailsUpdatedSubscrResp>(
        SUBSCRIPTION_FEED_DETAILS_UPDATED
    );

    const { data: removed,
        loading: removedLoading
    } = useSubscription<FeedDetailsRemovedSubscrResp>(
        SUBSCRIPTION_FEED_DETAILS_REMOVED
    );

    useEffect(() => {
        if (!updatedLoading && updated) {
            updateItem(updated?.feedDetailsUpdated || {});
        }
    }, [updated, updatedLoading])

    useEffect(() => {
        if (!createdLoading && created) {
            addItem(created?.feedDetailsCreated)
        }
    }, [created, createdLoading])

    useEffect(() => {
        if (!removedLoading && removed) {
            removeItemByKey(removed?.feedDetailsRemoved?.key as string)
        }
    }, [created, createdLoading])
}