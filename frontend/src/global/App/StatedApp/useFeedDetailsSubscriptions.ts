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
import {useAuth} from "../../../common/hooks/useAuth";

export const useFeedDetailsSubscriptions = () => {
    const auth = useAuth();

    const {addItem,
        updateItem,
        removeItemByKey} = useAvailableFeedDetailsState();

    const { data: createdFeedDetails,
        loading: createdFeedDetailsLoading,
        error: createdFeedDetailsError,
    } = useSubscription<FeedDetailsCreatedSubscrResp>(
        SUBSCRIPTION_FEED_DETAILS_CREATED
    );

    const { data: updatedFeedDetails,
        loading: updatedFeedDetailsLoading,
        error: updatedFeedDetailsError,
    } = useSubscription<FeedDetailsUpdatedSubscrResp>(
        SUBSCRIPTION_FEED_DETAILS_UPDATED
    );

    const { data: removedFeedDetails,
        loading: removedFeedDetailsLoading,
        error: removedFeedDetailsError,
    } = useSubscription<FeedDetailsRemovedSubscrResp>(
        SUBSCRIPTION_FEED_DETAILS_REMOVED
    );

    auth?.logoutIfAuthError(createdFeedDetailsError);
    auth?.logoutIfAuthError(updatedFeedDetailsError);
    auth?.logoutIfAuthError(removedFeedDetailsError);

    useEffect(() => {
        if (!updatedFeedDetailsLoading && updatedFeedDetails) {
            updateItem(updatedFeedDetails?.feedDetailsUpdated || {});
        }
    }, [updatedFeedDetails, updatedFeedDetailsLoading])

    useEffect(() => {
        if (!createdFeedDetailsLoading && createdFeedDetails) {
            addItem(createdFeedDetails?.feedDetailsCreated)
        }
    }, [createdFeedDetails, createdFeedDetailsLoading])

    useEffect(() => {
        if (!removedFeedDetailsLoading && removedFeedDetails) {
            removeItemByKey(removedFeedDetails?.feedDetailsRemoved?.key as string)
        }
    }, [createdFeedDetails, createdFeedDetailsLoading])
}