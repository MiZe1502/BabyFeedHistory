import {gql} from "@apollo/client/core";

export const QUERY_GET_FEEDS = gql`
    query Feeds($year: Int!, $month: Int!) {
        lastMonthFeeds(year: $year, month: $month) {
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

export const MUTATION_REMOVE_FEED_ITEM = gql`
    mutation RemoveFeedDetails($key: String) {
        removeFeedDetails(key: $key)
    }
`

export interface FeedsResp {
    lastMonthFeeds?: FeedItem[];
}

export interface FeedsVariables {
    year: number;
    month: number;
}

export interface FeedItem {
    key: string;
    timestamp: number;
    details?: FeedItemDetails[]
}

export interface FeedItemDetails {
    type: string;
    name: string;
    amount?: number;
    amountOfWhat?: string;
    wasGiven?: boolean;
}

