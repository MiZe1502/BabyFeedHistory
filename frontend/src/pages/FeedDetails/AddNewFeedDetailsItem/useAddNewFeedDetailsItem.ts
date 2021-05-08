import {useState} from "react";

export const useAddNewFeedDetailsItem = () => {
    const [isPopupOpened, setIsPopupOpened] = useState(false);

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
    }
}