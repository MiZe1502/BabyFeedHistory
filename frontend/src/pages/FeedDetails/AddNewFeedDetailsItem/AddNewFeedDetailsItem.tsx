import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { EditFeedDetailsPopup } from "../EditFeedDetailsPopup/EditFeedDetailsPopup";
import {useAddNewFeedDetailsItem} from "./useAddNewFeedDetailsItem";

import css from "./AddNewFeedDetailsItem.scss";

export const AddNewFeedDetailsItem = () => {
    const {
        isPopupOpened,
        onClose,
        onOpen,
    } = useAddNewFeedDetailsItem();

    return <div className={css.AddNewWrapper}>
        <IconButton onClick={onOpen}>
            <AddCircleIcon />
        </IconButton>
        {isPopupOpened && <EditFeedDetailsPopup onClose={onClose} />}
    </div>
}