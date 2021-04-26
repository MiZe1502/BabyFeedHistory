import {gql} from "@apollo/client";
import { FeedItemDetails } from "../feedDetails/queries";

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

export const QUERY_GET_FEEDS_FOR_DAY = gql`
    query DayFeeds($from: Int!, $to: Int!) {
        feedsForDay(from: $from, to: $to) {
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

export interface FeedsForDayResp {
    feedsForDay?: FeedItem[];
}

export interface FeedsForDayVariables {
    from: number;
    to: number;
}
