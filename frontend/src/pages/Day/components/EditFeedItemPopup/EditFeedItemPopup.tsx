import React from "react";
import Dialog from "@material-ui/core/Dialog";
import {FormattedMessage} from "react-intl";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from '@material-ui/icons/Remove';
import dateFns from "date-fns";

import css from "./EditFeedItemPopup.scss";
import {TextFieldWrapped} from "../../../../common/components/TextField/TextField";
import {List} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {Header} from "./components/Header/Header";
import {FeedDetailsList} from "./components/FeedDetailsList/FeedDetailsList";
import {useEditFeedItemPopup} from "./useEditFeedItemPopup";
import {EditFeedDetailsPopup} from "../../../FeedDetails/EditFeedDetailsPopup/EditFeedDetailsPopup";
import {FeedItem} from "../../../../api/feedItems/queries";

export interface EditFeedItemPopupProps {
    feedItem?: FeedItem;
    onClose?: () => void;
    currentDay?: string;
}


const parseTimestamp = (ts?: number): string => {
    if (!ts) {
        return '00:00';
    }
    const format = "HH:mm";
    return dateFns.format(ts!, format);
}

export const EditFeedItemPopup = (props: EditFeedItemPopupProps) => {
    const {
        currentFeedItem,
        updateLoading,
        updateError,
        createLoading,
        createError,
        errors,
        intl,
        register,
        handleSubmit,
        isPopupOpened,
        onSubmit,
        onAddNewFeedDetails,
        onRemoveFeedDetailsFromItem,
        onCancel,
        onCreateNewFeedDetailsPopupClose,
        onCreateNewFeedDetailsPopupOpen
    } = useEditFeedItemPopup(props)

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
                    disabled={updateLoading || createLoading}
                    error={Boolean(errors.timestamp)}
                    helperText={errors.timestamp?.message}
                />
                {currentFeedItem?.details && <List className={css.FeedItemsList}>
                    {currentFeedItem?.details?.map((item, index) => {
                        return <ListItem key={item.name}>
                            <ListItemText primary={item.name} secondary={`${item.amount} ${item.amountOfWhat}`}/>
                            <IconButton onClick={() => onRemoveFeedDetailsFromItem(index)}>
                                <RemoveIcon />
                            </IconButton>
                        </ListItem>
                        })}
                </List>}

                <FeedDetailsList
                    onCreateNewFeedDetailsPopupOpen={onCreateNewFeedDetailsPopupOpen}
                    onAddNewFeedDetails={onAddNewFeedDetails}/>
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
        {isPopupOpened &&
            <EditFeedDetailsPopup onClose={onCreateNewFeedDetailsPopupClose}/>}
    </Dialog>
}