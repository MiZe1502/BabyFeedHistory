import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from '@material-ui/icons/AddCircle';

import css from "./AddNewFeedItem.scss";
import {EditFeedItemPopup} from "../EditFeedItemPopup/EditFeedItemPopup";
import {useRouteMatch} from "react-router-dom";

export const AddNewFeedItem = () => {
    const [isPopupOpened, setIsPopupOpened] = useState(false);
    const match = useRouteMatch<{date: string}>();

    const onClose = () => {
        setIsPopupOpened(false);
    }

    const onOpen = () => {
        setIsPopupOpened(true);
    }

    return <div className={css.AddNewWrapper}>
        <IconButton onClick={onOpen}>
            <AddCircleIcon />
        </IconButton>
        {isPopupOpened && <EditFeedItemPopup onClose={onClose}
                                             currentDay={match.params.date}/>}
    </div>
}