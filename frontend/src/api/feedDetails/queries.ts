import {gql} from "@apollo/client";

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

export interface FeedItemDetails {
    key: string;
    type: string;
    name: string;
    amount?: number;
    amountOfWhat?: string;
    wasGiven?: boolean;
}