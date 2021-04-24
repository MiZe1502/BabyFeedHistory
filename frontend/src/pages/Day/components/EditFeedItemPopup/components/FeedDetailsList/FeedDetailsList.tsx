import React, {useEffect, useState} from "react";
import css from "./FeedDetailsList.scss";
import IconButton from "@material-ui/core/IconButton";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import {List} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {useQuery, useSubscription} from "@apollo/client";
import {
    GetAvailableFeedDetailsResp,
    QUERY_GET_AVAILABLE_FEED_DETAILS
} from "../../api";
import {FeedItemDetails} from "../../../../../History/api";
import CircularProgress from "@material-ui/core/CircularProgress";
import {ErrorMessage} from "../../../../../../common/components/ErrorMessage/ErrorMessage";
import AddIcon from '@material-ui/icons/Add';
import {
    FeedDetailsCreatedSubscrResp,
    SUBSCRIPTION_FEED_DETAILS_CREATED
} from "../../../../../FeedDetails/api";

interface FeedDetailsListProps {
    onAddNewFeedDetails: (item: FeedItemDetails) => void;
    onCreateNewFeedDetailsPopupOpen: () => void;
}

export const FeedDetailsList = ({onAddNewFeedDetails, onCreateNewFeedDetailsPopupOpen}: FeedDetailsListProps) => {
    const [feedDetails, setFeedDetails] = useState<FeedItemDetails[]>([])

    const {
        data,
        error,
        loading
    } = useQuery<GetAvailableFeedDetailsResp>(QUERY_GET_AVAILABLE_FEED_DETAILS);

    const { data: created,
        loading: createdLoading
    } = useSubscription<FeedDetailsCreatedSubscrResp>(
        SUBSCRIPTION_FEED_DETAILS_CREATED
    );

    useEffect(() => {
        if (!loading && data && data?.getAvailableFeedDetails.length > 0) {
            setFeedDetails(data?.getAvailableFeedDetails || []);
        }
    }, [data, loading])

    useEffect(() => {
        if (!createdLoading && created) {
            setFeedDetails([
                ...feedDetails,
                created.feedDetailsCreated
            ])
        }
    }, [created, createdLoading])

    const [isFeedsDetailsListOpened, setIsFeedsDetailsListOpened] = useState(false);

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
            <IconButton onClick={onCreateNewFeedDetailsPopupOpen}>
                <AddIcon />
            </IconButton>
        </div>

        {isFeedsDetailsListOpened && data && <List className={css.FeedDetailsAvailableList}>
            {feedDetails.map((item) => (
                <ListItem button onClick={() => onAddNewFeedDetails(item)} key={item.name}>
                    <ListItemText primary={item.name} secondary={`${item.amount} ${item.amountOfWhat}`}/>
                </ListItem>
            ))}
        </List>}
    </>
}