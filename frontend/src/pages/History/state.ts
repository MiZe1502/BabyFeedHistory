import {atom, useRecoilState} from "recoil";
import {FeedItem} from "./api";
import dateFns from "date-fns";

export const historyDataState = atom<FeedItem[]>({
    key: 'historyData',
    default: [],
});

export const useHistoryDataState = () => {
    const [historyData, setHistoryData] = useRecoilState(historyDataState);

    const removeItemByKey = (key: string) => {
        const updatedData = historyData.filter((item) => item.key !== key);
        setHistoryData(updatedData);
    }

    const addItem = (item: FeedItem) => {
        const updatedData = [...historyData, item];
        setHistoryData(updatedData);
    }

    const updateItem = (updatedItem: FeedItem) => {
        const updatedData = [...historyData];
        const index = updatedData.findIndex((item) => item.key === updatedItem.key);
        updatedData[index] = {...updatedItem};

        setHistoryData(updatedData);
    }

    const getItemsForDay = (date: string): FeedItem[] => {
        return historyData.filter((item) => {
            return dateFns.isSameDay(date, item.timestamp)
        })
    }

    return {
        historyData,
        removeItemByKey,
        addItem,
        updateItem,
        getItemsForDay,
    }
}