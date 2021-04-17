import React, {useEffect, useState} from "react";
import {FeedItem, FeedItemDetails} from "../../../History/api";
import {useRouteMatch} from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {FormattedMessage, useIntl} from "react-intl";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import RemoveIcon from '@material-ui/icons/Remove';
import dateFns from "date-fns";

import css from "./EditFeedItemPopup.scss";
import {useForm} from "react-hook-form";
import {useMutation, useQuery} from "@apollo/client";
import {
    GetAvailableFeedDetailsResp,
    MUTATION_EDIT_FEED_ITEM,
    QUERY_GET_AVAILABLE_FEED_DETAILS
} from "./api";
import {TextFieldWrapped} from "../../../../common/components/TextField/TextField";
import {List} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import {Header} from "./components/Header";
import {FeedDetailsList} from "./components/FeedDetailsList";

interface EditFeedItemPopupProps {
    feedItem?: FeedItem;
    onClose?: () => void;
}

interface EditFeedItemForm extends FeedItem {
    time: string;
}

interface EditFeedItemResp {
    updateFeed: FeedItem[];
}

const parseTimestamp = (ts?: number): string => {
    if (!ts) {
        return '00:00';
    }
    const format = "HH:mm";
    return dateFns.format(ts!, format);
}

export const EditFeedItemPopup = ({feedItem, onClose}: EditFeedItemPopupProps) => {
    const {params: {date}} = useRouteMatch<{date: string}>();

    const [currentFeedItem, setCurrentFeedItem] = useState<FeedItem | undefined>(feedItem);

    useEffect(() => {
        setCurrentFeedItem(feedItem)
    }, [feedItem])

    const intl = useIntl();

    const {register, handleSubmit, formState: {errors}, getValues} = useForm<EditFeedItemForm>({});

    const [updateMethod, {error, data, loading}] =
        useMutation<EditFeedItemResp>(MUTATION_EDIT_FEED_ITEM)

    const onSubmit = (data: EditFeedItemForm) => {
        const time = data.time;
        const hours = +time.split(':')[0];
        const minutes = +time.split(':')[1];

        const date = new Date(currentFeedItem?.timestamp || 0);
        date.setHours(hours);
        date.setMinutes(minutes);

        const newFeedItem = {
            ...currentFeedItem,
            timestamp: date.getTime(),
        }

        onEditFeedItem(newFeedItem as FeedItem);
    }

    const onEditFeedItem = (data: FeedItem) => {
        updateMethod({variables: {
            feedItem: data,
        }})
        .then((res) => {
            console.log(res)
            onCancel();
        })
        .catch((err) => {
            console.log(err)
        });
    }

    const onCancel = () => {
        onClose?.();
    }

    const onAddNewFeedDetails = (item: FeedItemDetails) => {
        const details = currentFeedItem?.details || [];
        setCurrentFeedItem({
            ...currentFeedItem,
            details: [
                ...details,
                item
            ]
        } as FeedItem)
    }

    const onRemoveFeedDetailsFromItem = (index: number) => {
        const curFeedItem = {...currentFeedItem};
        curFeedItem.details = [...(curFeedItem.details?.slice(0, index) || []),
            ...(curFeedItem.details?.slice(index + 1, curFeedItem.details?.length) || [])]

        setCurrentFeedItem({
            ...curFeedItem
        } as FeedItem)
    }

    return <Dialog open={true}>
        <div className={css.PopupTitleWrapper}>
            <Header currentFeedItem={currentFeedItem} onCancel={onCancel}/>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
                <TextFieldWrapped
                    inputRef={register({
                        required: intl.formatMessage({
                            id: "FeedItem.Card.Edit.Fields.Timestamp.Required"}),
                    })}
                    defaultValue={parseTimestamp(currentFeedItem?.timestamp)}
                    placeholder="hh:mm"
                    id="time"
                    name="time"
                    label={intl.formatMessage({id: "FeedItem.Card.Edit.Fields.Timestamp"})}
                    type="text"
                    disabled={loading}
                    error={Boolean(errors.timestamp)}
                    helperText={errors.timestamp?.message}
                />
                {currentFeedItem?.details && <List>
                    {currentFeedItem?.details?.map((item, index) => {
                        return <ListItem key={item.name}>
                            <ListItemText primary={item.name} secondary={`${item.amount} ${item.amountOfWhat}`}/>
                            <IconButton onClick={() => onRemoveFeedDetailsFromItem(index)}>
                                <RemoveIcon />
                            </IconButton>
                        </ListItem>
                        })}
                </List>}

                <FeedDetailsList onAddNewFeedDetails={onAddNewFeedDetails}/>
            </DialogContent>
            <DialogActions>
                <Button type="submit" color="primary">
                    <FormattedMessage id="FeedItem.Card.Edit.Buttons.Save" />
                </Button>
                <Button onClick={onCancel} color="secondary">
                    <FormattedMessage id="FeedItem.Card.Edit.Buttons.Cancel" />
                </Button>
            </DialogActions>
        </form>
    </Dialog>
}