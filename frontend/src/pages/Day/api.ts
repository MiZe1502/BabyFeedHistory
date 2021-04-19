import {gql} from "@apollo/client/core";
import {FeedItem} from "../History/api";

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
    feedsForDay?: FeedItem[];
}

export interface FeedsVariables {
    from: number;
    to: number;
}