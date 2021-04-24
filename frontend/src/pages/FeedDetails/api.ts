import {gql} from "@apollo/client";
import {FeedItem, FeedItemDetails} from "../History/api";

export const MUTATION_EDIT_FEED_DETAILS = gql`
    mutation UpdateFeedDetails($feedDetails: ExistedFeedDetailsInput!) {
        updateFeedDetails(feedDetails: $feedDetails){
            key,
            type,
            name,
            amount,
            amountOfWhat,
            wasGiven
        }
    }
`

export const MUTATION_CREATE_FEED_DETAILS = gql`
    mutation UpdateFeedDetails($feedDetails: FeedDetailsInput!) {
        createFeedDetails(feedDetails: $feedDetails){
            key,
            type,
            name,
            amount,
            amountOfWhat,
            wasGiven
        }
    }
`

export const SUBSCRIPTION_FEED_DETAILS_CREATED = gql`
    subscription FeedDetailsCreated {
        feedDetailsCreated {
            key,
            type,
            name,
            amount,
            amountOfWhat,
            wasGiven
        }
    }
`

export interface EditFeedDetailsResp {
    updateFeedDetails: FeedItemDetails;
}

export interface CreateFeedDetailsResp {
    createFeedDetails: FeedItemDetails;
}

export interface FeedDetailsCreatedSubscrResp {
    feedDetailsCreated: FeedItemDetails;
}