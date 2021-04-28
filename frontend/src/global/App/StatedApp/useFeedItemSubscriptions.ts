import {useHistoryDataState} from "../../../state/useHistoryDataState";
import {useSubscription} from "@apollo/client";
import {
    FeedCreatedSubscrResp,
    FeedRemovedSubscrResp,
    FeedUpdatedSubscrResp, SUBSCRIPTION_FEED_CREATED, SUBSCRIPTION_FEED_REMOVED,
    SUBSCRIPTION_FEED_UPDATED
} from "../../../api/feedItems/subscriptions";
import {useEffect} from "react";

export const useFeedItemSubscriptions = () => {
    const {addItem,
        updateItem,
        removeItemByKey} = useHistoryDataState();

    const { data: updatedFeed,
        loading: updatedFeedLoading
    } = useSubscription<FeedUpdatedSubscrResp>(
        SUBSCRIPTION_FEED_UPDATED
    );

    const { data: removedFeed,
        loading: removedFeedLoading
    } = useSubscription<FeedRemovedSubscrResp>(
        SUBSCRIPTION_FEED_REMOVED
    );

    const { data: createdFeed,
        loading: createdFeedLoading
    } = useSubscription<FeedCreatedSubscrResp>(
        SUBSCRIPTION_FEED_CREATED
    );

    useEffect(() => {
        if (!updatedFeedLoading && updatedFeed) {
            updateItem(updatedFeed?.feedUpdated || {})
        }
    }, [updatedFeed, updatedFeedLoading])

    useEffect(() => {
        if (!removedFeedLoading && removedFeed) {
            removeItemByKey(removedFeed?.feedRemoved?.key)
        }
    }, [removedFeed, removedFeedLoading])

    useEffect(() => {
        if (!createdFeedLoading && createdFeed) {
            addItem(createdFeed?.feedCreated)
        }
    }, [createdFeed, createdFeedLoading])
}