import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {FormattedMessage} from "react-intl";
import css from "../EditFeedItemPopup/EditFeedItemPopup.scss";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import {ButtonWithLoading} from "../../../../common/components/ButtonWithLoading/ButtonWithLoading";
import {ErrorMessage} from "../../../../common/components/ErrorMessage/ErrorMessage";

interface RemoveFeedItemPopupProps {
    onClose?: () => void;
    onRemove?: () => void;
    key: string;
    loading: boolean;
    error?: string;
}

export const RemoveFeedItemPopup = ({error, onClose, onRemove, loading}: RemoveFeedItemPopupProps) => {

    return <Dialog open={true}>
        <div className={css.PopupTitleWrapper}>
            <DialogTitle id="form-dialog-title">
                <FormattedMessage id="FeedItem.Card.Remove.Title"/>
            </DialogTitle>
            <IconButton aria-label="close" onClick={onClose}>
                <CloseIcon />
            </IconButton>
        </div>
        <DialogContent>
            <Typography variant="h5" component="h2">
                <FormattedMessage id="FeedItem.Card.Remove.Message" />
            </Typography>
            <ErrorMessage showError={Boolean(error)} errorMessage={error}/>
        </DialogContent>
        <DialogActions>
            <ButtonWithLoading locId="FeedItem.Card.Remove.Buttons.Yes"
                               onClick={onRemove}
                               loading={loading} />
            <Button onClick={onClose} color="secondary">
                <FormattedMessage id="FeedItem.Card.Remove.Buttons.No" />
            </Button>
        </DialogActions>
    </Dialog>
}