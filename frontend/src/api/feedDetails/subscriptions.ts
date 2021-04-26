import {gql} from "@apollo/client";
import {FeedItemDetails} from "./queries";

export const SUBSCRIPTION_FEED_DETAILS_CREATED = gql`
    subscription FeedDetailsCreated {
        feedDetailsCreated {
            key,
            type,
            name,
            amount,
            amountOfWhat,
            wasGiven
        }
    }
`

export const SUBSCRIPTION_FEED_DETAILS_UPDATED = gql`
    subscription FeedDetailsUpdated {
        feedDetailsUpdated {
            key,
            type,
            name,
            amount,
            amountOfWhat,
            wasGiven
        }
    }
`

export const SUBSCRIPTION_FEED_DETAILS_REMOVED = gql`
    subscription FeedDetailsRemoved {
        feedDetailsRemoved {
            key,
            type,
            name,
            amount,
            amountOfWhat,
            wasGiven
        }
    }
`

export interface FeedDetailsCreatedSubscrResp {
    feedDetailsCreated: FeedItemDetails;
}

export interface FeedDetailsUpdatedSubscrResp {
    feedDetailsUpdated: FeedItemDetails;
}

export interface FeedDetailsRemovedSubscrResp {
    feedDetailsRemoved: FeedItemDetails;
}
