import {gql} from "@apollo/client";
import { FeedItem } from "./queries";

export const SUBSCRIPTION_FEED_UPDATED = gql`
    subscription FeedUpdated {
        feedUpdated {
            key,
            timestamp,
            details {
                key,
                type,
                name,
                amount,
                amountOfWhat,
                wasGiven,
            }
        }
    }
`

export const SUBSCRIPTION_FEED_CREATED = gql`
    subscription FeedCreated {
        feedCreated {
            key,
            timestamp,
            details {
                key,
                type,
                name,
                amount,
                amountOfWhat,
                wasGiven,
            }
        }
    }
`

export const SUBSCRIPTION_FEED_REMOVED = gql`
    subscription FeedRemoved {
        feedRemoved {
            key
        }
    }
`

export interface FeedRemovedSubscrResp {
    feedRemoved: FeedItem;
}

export interface FeedUpdatedSubscrResp {
    feedUpdated: FeedItem;
}

export interface FeedCreatedSubscrResp {
    feedCreated: FeedItem;
}