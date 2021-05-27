import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {EditFeedItemPopup} from "../EditFeedItemPopup/EditFeedItemPopup";
import {useAddNewFeedItem} from "./useAddNewFeedItem";

import css from "./AddNewFeedItem.scss";

export const AddNewFeedItem = (): React.ReactElement => {
    const {
        isPopupOpened,
        onClose,
        onOpen,
        match
    } = useAddNewFeedItem();

    return <div className={css.AddNewWrapper}>
        <IconButton onClick={onOpen}>
            <AddCircleIcon />
        </IconButton>
        {isPopupOpened && <EditFeedItemPopup onClose={onClose}
                                             currentDay={match.params.date}/>}
    </div>
}