import {gql} from "@apollo/client";
import {FeedItem, FeedItemDetails} from "../../../History/api";

export const MUTATION_EDIT_FEED_ITEM = gql`
    mutation UpdateFeed($feedItem: ExistedFeedInput) {
        updateFeed(feed: $feedItem){
            key,
            timestamp,
            details{
                key,
                type,
                name,
                amount,
                amountOfWhat,
                wasGiven
            }
        }
    }
`

export const QUERY_GET_AVAILABLE_FEED_DETAILS = gql`
    query GetFeedDetails{
        getAvailableFeedDetails{
            key,
            type,
            name,
            amount,
            amountOfWhat,
            wasGiven
        }
    }
`

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

export interface FeedUpdatedSubscrResp {
    feedUpdated: FeedItem;
}

export interface GetAvailableFeedDetailsResp {
    getAvailableFeedDetails: FeedItemDetails[];
}