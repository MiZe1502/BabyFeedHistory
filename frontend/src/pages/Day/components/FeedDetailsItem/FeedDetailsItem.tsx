import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {FeedItemDetails} from "../../../../api/feedDetails/queries";
import {FeedDetailsSimpleItem} from "../../../FeedDetails/FeedDetailsSimpleItem/FeedDetailsSimpleItem";

interface FeedDetailsItemProps {
    feedDetails?: FeedItemDetails[]
}

export const FeedDetailsItem = ({feedDetails}: FeedDetailsItemProps) => {
    return <List component="div">
        {feedDetails?.map((detailsItem) => {
            return <ListItem>
                <FeedDetailsSimpleItem detailsItem={detailsItem}/>
            </ListItem>
        })}
    </List>
}