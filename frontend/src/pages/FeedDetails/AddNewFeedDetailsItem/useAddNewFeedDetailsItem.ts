import {useState} from "react";

interface UseAddNewFeedDetailsItemRet {
    isPopupOpened: boolean;
    onClose: () => void;
    onOpen: () => void;
}

export const useAddNewFeedDetailsItem = (): UseAddNewFeedDetailsItemRet => {
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