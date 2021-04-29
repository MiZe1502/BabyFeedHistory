import React from "react";
import {FormattedMessage} from "react-intl";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from '@material-ui/icons/Remove';
import {TextFieldWrapped} from "../../../../common/components/TextField/TextField";
import {List} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {FeedDetailsList} from "./components/FeedDetailsList/FeedDetailsList";
import {parseTimestamp, useEditFeedItemPopup} from "./useEditFeedItemPopup";
import {EditFeedDetailsPopup} from "../../../FeedDetails/EditFeedDetailsPopup/EditFeedDetailsPopup";
import {FeedItem} from "../../../../api/feedItems/queries";
import {ErrorMessage} from "../../../../common/components/ErrorMessage/ErrorMessage";
import {Popup} from "../../../../common/components/Popup/Popup";

import css from "./EditFeedItemPopup.scss";

export interface EditFeedItemPopupProps {
    feedItem?: FeedItem;
    onClose?: () => void;
    currentDay?: string;
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

    return <><Popup onClose={onCancel} titleId={currentFeedItem ?
            "FeedItem.Card.Edit.Title" : "FeedItem.Card.Create.Title"}>
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

                <ErrorMessage
                    showError={Boolean(updateError) || Boolean(createError)}
                    errorMessage={updateError?.message || createError?.message}/>
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
    </Popup>
    {isPopupOpened && <EditFeedDetailsPopup onClose={onCreateNewFeedDetailsPopupClose}/>}
    </>
}