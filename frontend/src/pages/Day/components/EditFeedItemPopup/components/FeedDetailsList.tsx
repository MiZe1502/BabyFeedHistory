import React, {useState} from "react";
import css from "./FeedDetailsList.scss";
import IconButton from "@material-ui/core/IconButton";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import {List} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {useQuery} from "@apollo/client";
import {
    GetAvailableFeedDetailsResp,
    QUERY_GET_AVAILABLE_FEED_DETAILS
} from "../api";
import {FeedItemDetails} from "../../../../History/api";

interface FeedDetailsListProps {
    onAddNewFeedDetails: (item: FeedItemDetails) => void;
}

export const FeedDetailsList = ({onAddNewFeedDetails}: FeedDetailsListProps) => {
    const {
        data: feedDetailsData,
        error: feedDetailsError,
        loading: feedDetailsLoading
    } = useQuery<GetAvailableFeedDetailsResp>(QUERY_GET_AVAILABLE_FEED_DETAILS);

    const [isFeedsDetailsListOpened, setIsFeedsDetailsListOpened] = useState(false);

    const onAddNewFeedDetailsItemClick = () => {
        setIsFeedsDetailsListOpened(!isFeedsDetailsListOpened);
    }

    return <>
        <div className={css.AddNewFeedDetailsItemBlock}>
            <IconButton onClick={onAddNewFeedDetailsItemClick}>
                {isFeedsDetailsListOpened ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
        </div>

        {isFeedsDetailsListOpened && feedDetailsData && <List className={css.FeedDetailsAvailableList}>
            {feedDetailsData?.getAvailableFeedDetails?.map((item) => (
                <ListItem button onClick={() => onAddNewFeedDetails(item)} key={item.name}>
                    <ListItemText primary={item.name} secondary={`${item.amount} ${item.amountOfWhat}`}/>
                </ListItem>
            ))}
        </List>}
    </>
}