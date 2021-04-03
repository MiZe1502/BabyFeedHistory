import {gql} from "@apollo/client/core";

export const QUERY_GET_FEEDS = gql`
    query Feeds($year: Int!, $month: Int!) {
        lastMonthFeeds(year: $year, month: $month) {
            key,
            timestamp,
            details {
                type,
                name,
                amount,
                amountOfWhat,
                wasGiven,
            }
        }
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

