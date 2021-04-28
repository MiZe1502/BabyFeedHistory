import {useState} from "react";
import {useRouteMatch} from "react-router-dom";

export const useAddNewFeedItem = () => {
    const [isPopupOpened, setIsPopupOpened] = useState(false);
    const match = useRouteMatch<{date: string}>();

    const onClose = () => {
        setIsPopupOpened(false);
    }

    const onOpen = () => {
        setIsPopupOpened(true);
    }

    return {
        isPopupOpened,
        onClose,
        onOpen,
        match
    }
}