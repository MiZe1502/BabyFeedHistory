import {atom, useRecoilState} from "recoil";
import {FeedItemDetails} from "../History/api";

export const availableFeedDetailsState = atom<FeedItemDetails[]>({
    key: 'availableFeedDetails',
    default: [],
});

export const useAvailableFeedDetailsState = () => {
    const [availableFeedDetails, setAvailableFeedDetails] = useRecoilState(availableFeedDetailsState);

    const removeItemByKey = (key: string) => {
        const updatedData = availableFeedDetails.filter((item) => item.key !== key);
        setAvailableFeedDetails(updatedData);
    }

    const addItem = (item: FeedItemDetails) => {
        const updatedData = [...availableFeedDetails, item];
        setAvailableFeedDetails(updatedData);
    }

    const addItems = (items: FeedItemDetails[]) => {
        const updatedData = [...availableFeedDetails, ...items];
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