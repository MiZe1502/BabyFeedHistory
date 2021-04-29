import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {FormattedMessage} from "react-intl";
import Typography from "@material-ui/core/Typography";
import {ButtonWithLoading} from "../../../../common/components/ButtonWithLoading/ButtonWithLoading";
import {ErrorMessage} from "../../../../common/components/ErrorMessage/ErrorMessage";
import {Popup} from "../../../../common/components/Popup/Popup";

interface RemoveFeedItemPopupProps {
    onClose?: () => void;
    onRemove?: () => void;
    key: string;
    loading: boolean;
    error?: string;
}

export const RemoveFeedItemPopup = ({error, onClose, onRemove, loading}: RemoveFeedItemPopupProps) => {

    return <Popup titleId="FeedItem.Card.Remove.Title" onClose={onClose}>
        <>
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
        </>
    </Popup>
}