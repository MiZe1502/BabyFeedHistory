import {atom, useRecoilState} from "recoil";
import {FeedItemDetails} from "../api/feedDetails/queries";

export const availableFeedDetailsState = atom<FeedItemDetails[]>({
    key: 'availableFeedDetails',
    default: [],
});

interface UseAvailableFeedDetailsStateRet {
    availableFeedDetails: FeedItemDetails[];
    removeItemByKey: (key: string) => void;
    addItem: (item: FeedItemDetails) => void;
    addItems: (items: FeedItemDetails[], replace?: boolean) => void;
    updateItem: (updatedItem: FeedItemDetails) => void;
}

export const useAvailableFeedDetailsState = (): UseAvailableFeedDetailsStateRet => {
    const [availableFeedDetails, setAvailableFeedDetails] = useRecoilState(availableFeedDetailsState);

    const removeItemByKey = (key: string) => {
        const updatedData = availableFeedDetails.filter((item) => item.key !== key);
        setAvailableFeedDetails(updatedData);
    }

    const addItem = (item: FeedItemDetails) => {
        const updatedData = [...availableFeedDetails, item];
        setAvailableFeedDetails(updatedData);
    }

    const addItems = (items: FeedItemDetails[], replace?: boolean) => {
        const updatedData = replace ? [...items] : [...availableFeedDetails, ...items];
        setAvailableFeedDetails(updatedData);
    }

    const updateItem = (updatedItem: FeedItemDetails) => {
        const updatedData = [...availableFeedDetails];
        const index = updatedData.findIndex((item) => item.key === updatedItem.key);
        updatedData[index] = {...updatedItem};

        setAvailableFeedDetails(updatedData);
    }

    return {
        availableFeedDetails,
        removeItemByKey,
        addItem,
        addItems,
        updateItem,
    }
}