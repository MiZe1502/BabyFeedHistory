import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import {FormattedMessage} from "react-intl";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {FeedItemDetails} from "../../../../History/api";

interface HeaderProps {
    currentFeedDetails?: FeedItemDetails;
    onCancel?: () => void;
}

export const Header = ({currentFeedDetails, onCancel}: HeaderProps) => {
    return <>
        <DialogTitle id="form-dialog-title">
            <FormattedMessage id={currentFeedDetails ?
                "FeedItem.Card.Edit.Title" : "FeedItem.Card.Create.Title"} />
        </DialogTitle>
        <IconButton aria-label="close" onClick={onCancel}>
            <CloseIcon />
        </IconButton>
    </>
}