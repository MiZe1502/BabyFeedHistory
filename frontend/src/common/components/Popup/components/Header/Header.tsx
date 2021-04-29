import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import {FormattedMessage} from "react-intl";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

interface HeaderProps {
    titleId?: string;
    onClose?: () => void;
}

export const Header = ({titleId, onClose}: HeaderProps): React.ReactElement => {
    return <>
        <DialogTitle id="form-dialog-title">
            {titleId && <FormattedMessage id={titleId} />}
        </DialogTitle>
        <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
        </IconButton>
    </>
}