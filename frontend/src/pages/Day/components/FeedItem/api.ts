import {gql} from "@apollo/client/core";

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