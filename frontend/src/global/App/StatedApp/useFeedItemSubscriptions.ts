import {useHistoryDataState} from "../../../state/useHistoryDataState";
import {useSubscription} from "@apollo/client";
import {
    FeedCreatedSubscrResp,
    FeedRemovedSubscrResp,
    FeedUpdatedSubscrResp, SUBSCRIPTION_FEED_CREATED, SUBSCRIPTION_FEED_REMOVED,
    SUBSCRIPTION_FEED_UPDATED
} from "../../../api/feedItems/subscriptions";
import {useEffect} from "react";
import {useAuth} from "../../../common/hooks/useAuth";

export const useFeedItemSubscriptions = () => {
    const auth = useAuth();

    const {addItem,
        updateItem,
        removeItemByKey} = useHistoryDataState();

    const { data: updatedFeed,
        loading: updatedFeedLoading,
        error: updatedFeedError,
    } = useSubscription<FeedUpdatedSubscrResp>(
        SUBSCRIPTION_FEED_UPDATED
    );

    const { data: removedFeed,
        loading: removedFeedLoading,
        error: removedFeedError,
    } = useSubscription<FeedRemovedSubscrResp>(
        SUBSCRIPTION_FEED_REMOVED
    );

    const { data: createdFeed,
        loading: createdFeedLoading,
        error: createdFeedError,
    } = useSubscription<FeedCreatedSubscrResp>(
        SUBSCRIPTION_FEED_CREATED
    );

    auth?.logoutIfAuthError(createdFeedError);
    auth?.logoutIfAuthError(updatedFeedError);
    auth?.logoutIfAuthError(removedFeedError);

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