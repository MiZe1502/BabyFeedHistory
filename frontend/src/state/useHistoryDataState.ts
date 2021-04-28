import {atom, useRecoilState} from "recoil";
import dateFns from "date-fns";
import {FeedItem} from "../api/feedItems/queries";

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

    const addItems = (items: FeedItem[]) => {
        const updatedData = [...historyData, ...items];
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
        addItems,
        updateItem,
        getItemsForDay,
    }
}