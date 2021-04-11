import React from "react";
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

    }

    const onEditFeedItem = (data: FeedItem) => {
        updateMethod({variables: data})
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    return <Dialog open={true}>
        <div className={css.PopupTitleWrapper}>
            <DialogTitle id="form-dialog-title">
                <FormattedMessage id={feedItem ?
                    "FeedItem.Card.Edit.Title" : "FeedItem.Card.Create.Title"} />
            </DialogTitle>
            <IconButton aria-label="close" onClick={onClose}>
                <CloseIcon />
            </IconButton>
        </div>

        <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextFieldWrapped
                    inputRef={register({
                        required: intl.formatMessage({
                            id: "FeedItem.Card.Edit.Fields.Timestamp.Required"}),
                    })}
                    defaultValue={feedItem?.timestamp}
                    placeholder="hh:mm"
                    id="timestamp"
                    name="timestamp"
                    label={intl.formatMessage({id: "FeedItem.Card.Edit.Fields.Timestamp"})}
                    type="text"
                    disabled={loading}
                    error={Boolean(errors.timestamp)}
                    helperText={errors.timestamp?.message}
                />
                {feedItem?.details && <List>
                    {feedItem?.details?.map((item) => {
                        return <ListItem key={item.name}>
                            {item.name}
                        </ListItem>
                        })}
                </List>}

                {feedDetailsData && <List>
                    {feedDetailsData?.getAvailableFeedDetails?.map((item) => (
                        <ListItem key={item.name}>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    ))}
                </List>}
            </form>
        </DialogContent>
    </Dialog>
}