import React from "react";
import {FeedItem} from "../../../History/api";
import {useRouteMatch} from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {FormattedMessage} from "react-intl";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

import css from "./EditFeedItemPopup.scss";

interface EditFeedItemPopupProps {
    feedItem?: FeedItem;
    onClose?: () => void;
}

export const EditFeedItemPopup = ({feedItem, onClose}: EditFeedItemPopupProps) => {
    const {params: {date}} = useRouteMatch<{date: string}>();

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

        </DialogContent>
    </Dialog>
}