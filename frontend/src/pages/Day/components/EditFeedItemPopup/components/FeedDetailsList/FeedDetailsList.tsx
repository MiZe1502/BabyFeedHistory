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
} from "../../api";
import {FeedItemDetails} from "../../../../../History/api";
import CircularProgress from "@material-ui/core/CircularProgress";
import {ErrorMessage} from "../../../../../../common/components/ErrorMessage/ErrorMessage";
import AddIcon from '@material-ui/icons/Add';
import {EditFeedDetailsPopup} from "../../../../../FeedDetails/EditFeedDetailsPopup/EditFeedDetailsPopup";

interface FeedDetailsListProps {
    onAddNewFeedDetails: (item: FeedItemDetails) => void;
}

export const FeedDetailsList = ({onAddNewFeedDetails}: FeedDetailsListProps) => {
    const {
        data,
        error,
        loading
    } = useQuery<GetAvailableFeedDetailsResp>(QUERY_GET_AVAILABLE_FEED_DETAILS);

    const [isFeedsDetailsListOpened, setIsFeedsDetailsListOpened] = useState(false);
    const [isPopupOpened, setIsPopupOpened] = useState(false);

    const onClose = () => {
        setIsPopupOpened(false);
    }

    const onCreateNewFeedDetails = () => {
        setIsPopupOpened(true);
    }

    const onAddNewFeedDetailsItemClick = () => {
        setIsFeedsDetailsListOpened(!isFeedsDetailsListOpened);
    }

    if (loading) {
        return <div className={css.AddNewFeedDetailsItemBlock}>
            <CircularProgress size={16} disableShrink />
        </div>
    }

    if (error) {
        return <ErrorMessage showError={Boolean(error)} errorMessage={error.message}/>
    }

    return <>
        <div className={css.AddNewFeedDetailsItemBlock}>
            <IconButton onClick={onAddNewFeedDetailsItemClick}>
                {isFeedsDetailsListOpened ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            <IconButton onClick={onCreateNewFeedDetails}>
                <AddIcon />
            </IconButton>
        </div>

        {isFeedsDetailsListOpened && data && <List className={css.FeedDetailsAvailableList}>
            {data?.getAvailableFeedDetails?.map((item) => (
                <ListItem button onClick={() => onAddNewFeedDetails(item)} key={item.name}>
                    <ListItemText primary={item.name} secondary={`${item.amount} ${item.amountOfWhat}`}/>
                </ListItem>
            ))}
        </List>}

        {isPopupOpened && <EditFeedDetailsPopup onClose={onClose}/>}
    </>
}