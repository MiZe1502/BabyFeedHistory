import {useState} from "react";
import {match, useRouteMatch} from "react-router-dom";

interface UseAddNewFeedItemRet {
    isPopupOpened: boolean;
    onClose: () => void;
    onOpen: () => void;
    match: match<{date: string}>;
}

export const useAddNewFeedItem = (): UseAddNewFeedItemRet => {
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