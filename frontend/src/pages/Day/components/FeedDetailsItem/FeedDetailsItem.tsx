import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {FeedItemDetails} from "../../../../api/feedDetails/queries";
import {FeedDetailsBasicItem} from "../../../FeedDetails/FeedDetailsBasicItem/FeedDetailsBasicItem";

interface FeedDetailsItemProps {
    feedDetails?: FeedItemDetails[]
}

export const FeedDetailsItem = ({feedDetails}: FeedDetailsItemProps) => {
    return <List component="div">
        {feedDetails?.map((detailsItem) => {
            return <ListItem>
                <FeedDetailsBasicItem detailsItem={detailsItem}/>
            </ListItem>
        })}
    </List>
}