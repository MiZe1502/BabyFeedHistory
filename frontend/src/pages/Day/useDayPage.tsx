import {useRouteMatch} from "react-router-dom";
import {useIntl} from "react-intl";
import {useHistoryDataState} from "../History/state";
import {useLazyQuery} from "@apollo/client";
import {FeedsResp, FeedsVariables, QUERY_GET_FEEDS_FOR_DAY} from "./api";
import {useEffect, useState} from "react";
import dateFns from "date-fns";
import {FeedItem} from "../History/api";

export const useDayPage = () => {
    const match = useRouteMatch<{date: string}>();
    const intl = useIntl();

    const [ready, setReady] = useState(false);

    const {historyData,
        addItems,
        getItemsForDay} = useHistoryDataState();

    const [getFeeds, { loading, data, error }] = useLazyQuery<FeedsResp, FeedsVariables>(QUERY_GET_FEEDS_FOR_DAY);

    useEffect(() => {
        if (!historyData || historyData.length === 0) {
            const startOfDay = dateFns.setMilliseconds(dateFns.startOfDay(match.params.date), 0).getTime()
            const endOfDay = dateFns.setMilliseconds(dateFns.endOfDay(match.params.date), 0).getTime()
            getFeeds({
                variables: {
                    from: startOfDay / 1000,
                    to: endOfDay / 1000,
                }
            })
        }
    }, [])

    useEffect(() => {
        if (data) {
            addItems(data.feedsForDay || []);
        }
    }, [data])

    const [filteredData, setFilteredData] = useState<FeedItem[]>([])

    useEffect(() => {
        setFilteredData(getItemsForDay(match.params.date))
    }, [historyData])

    useEffect(() => {
        if (!loading && !error && filteredData && filteredData.length > 0) {
            setReady(true);
        }
    }, [filteredData])

    return {
        loading,
        error,
        filteredData,
        intl,
        ready
    }
}