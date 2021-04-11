import {gql} from "@apollo/client";
import {FeedItemDetails} from "../../../History/api";

export const MUTATION_EDIT_FEED_ITEM = gql`
    mutation UpdateFeed($feedItem: FeedInput) {
        updateFeed(feed: $feedItem){
            key,
            timestamp,
            details{
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

export interface GetAvailableFeedDetailsResp {
    getAvailableFeedDetails: FeedItemDetails[];
}