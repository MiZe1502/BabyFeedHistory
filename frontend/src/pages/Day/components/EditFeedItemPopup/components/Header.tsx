import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import {FormattedMessage} from "react-intl";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {FeedItem} from "../../../../History/api";

interface HeaderProps {
    currentFeedItem?: FeedItem;
    onCancel?: () => void;
}

export const Header = ({currentFeedItem, onCancel}: HeaderProps) => {
    return <>
        <DialogTitle id="form-dialog-title">
            <FormattedMessage id={currentFeedItem ?
                "FeedItem.Card.Edit.Title" : "FeedItem.Card.Create.Title"} />
        </DialogTitle>
        <IconButton aria-label="close" onClick={onCancel}>
            <CloseIcon />
        </IconButton>
    </>
}