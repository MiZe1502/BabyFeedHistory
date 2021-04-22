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

export const MUTATION_CREATE_FEED_ITEM = gql`
    mutation CreateFeed($feedItem: FeedInput) {
        createFeed(feed: $feedItem){
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

export interface GetAvailableFeedDetailsResp {
    getAvailableFeedDetails: FeedItemDetails[];
}