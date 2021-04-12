import React, {useEffect, useState} from "react";
import {FeedItem} from "../../../History/api";
import {useRouteMatch} from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {FormattedMessage, useIntl} from "react-intl";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

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
import AddBox from "@material-ui/icons/AddBox";
import DialogActions from "@material-ui/core/DialogActions";
import {ButtonWithLoading} from "../../../../common/components/ButtonWithLoading/ButtonWithLoading";
import Button from "@material-ui/core/Button";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

interface EditFeedItemPopupProps {
    feedItem?: FeedItem;
    onClose?: () => void;
}

interface EditFeedItemForm extends FeedItem {}

interface EditFeedItemResp {
    updateFeed: FeedItem[];
}

export const EditFeedItemPopup = ({feedItem, onClose}: EditFeedItemPopupProps) => {
    const {params: {date}} = useRouteMatch<{date: string}>();

    const [currentFeedItem, setCurrentFeedItem] = useState<FeedItem | undefined>(feedItem);
    const [isFeedsDetailsListOpened, setIsFeedsDetailsListOpened] = useState(false);

    useEffect(() => {
        setCurrentFeedItem(feedItem)
    }, [feedItem])

    const intl = useIntl();

    const {register, handleSubmit, formState: {errors}, getValues} = useForm<EditFeedItemForm>({});

    const [updateMethod, {error, data, loading}] =
        useMutation<EditFeedItemResp>(MUTATION_EDIT_FEED_ITEM)

    const {
        data: feedDetailsData,
        error: feedDetailsError,
        loading: feedDetailsLoading
    } = useQuery<GetAvailableFeedDetailsResp>(QUERY_GET_AVAILABLE_FEED_DETAILS);

    const onSubmit = (data: EditFeedItemForm) => {
        onEditFeedItem(currentFeedItem!);
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

    const onAddNewFeedDetailsItemClick = () => {
        setIsFeedsDetailsListOpened(!isFeedsDetailsListOpened);
    }

    return <Dialog open={true}>
        <div className={css.PopupTitleWrapper}>
            <DialogTitle id="form-dialog-title">
                <FormattedMessage id={currentFeedItem ?
                    "FeedItem.Card.Edit.Title" : "FeedItem.Card.Create.Title"} />
            </DialogTitle>
            <IconButton aria-label="close" onClick={onCancel}>
                <CloseIcon />
            </IconButton>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
                <TextFieldWrapped
                    inputRef={register({
                        required: intl.formatMessage({
                            id: "FeedItem.Card.Edit.Fields.Timestamp.Required"}),
                    })}
                    defaultValue={currentFeedItem?.timestamp}
                    placeholder="hh:mm"
                    id="timestamp"
                    name="timestamp"
                    label={intl.formatMessage({id: "FeedItem.Card.Edit.Fields.Timestamp"})}
                    type="text"
                    disabled={loading}
                    error={Boolean(errors.timestamp)}
                    helperText={errors.timestamp?.message}
                />
                {currentFeedItem?.details && <List>
                    {currentFeedItem?.details?.map((item) => {
                        return <ListItem key={item.name}>
                            {item.name}
                        </ListItem>
                        })}
                </List>}

                <div className={css.AddNewFeedFetailsItemBlock}>
                    <IconButton onClick={onAddNewFeedDetailsItemClick}>
                        {isFeedsDetailsListOpened ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </div>

                {isFeedsDetailsListOpened && feedDetailsData && <List className={css.FeedDetailsAvailableList}>
                    {feedDetailsData?.getAvailableFeedDetails?.map((item) => (
                        <ListItem key={item.name}>
                            <ListItemText primary={item.name} secondary={`${item.amount} ${item.amountOfWhat}`}/>
                        </ListItem>
                    ))}
                </List>}
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