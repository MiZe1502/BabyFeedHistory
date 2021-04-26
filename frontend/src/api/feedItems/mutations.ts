import {gql} from "@apollo/client";

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

export const MUTATION_REMOVE_FEED_ITEM = gql`
    mutation RemoveFeed($key: String!) {
        removeFeed(key: $key){
            key
        }
    }
`

export interface FeedRemovedResp {
    removeFeed: {
        key: string;
    }
}
