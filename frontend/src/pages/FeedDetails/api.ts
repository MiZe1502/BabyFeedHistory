import {gql} from "@apollo/client";
import {FeedItemDetails} from "../History/api";

export const MUTATION_EDIT_FEED_DETAILS = gql`
    mutation UpdateFeedDetails($feedDetails: ExistedFeedDetailsInput) {
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

export interface EditFeedDetailsResp {
    updateFeedDetails: FeedItemDetails;
}