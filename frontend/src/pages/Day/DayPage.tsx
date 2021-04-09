import React, {useState} from "react";
import {client} from "../../api";
import {FeedsResp, QUERY_GET_FEEDS} from "../History/api";
import dateFns from "date-fns";
import { useRouteMatch } from "react-router-dom";

export const DayPage = () => {
    const match = useRouteMatch<{date: string}>();

    const [currentDate, setCurrentDate] = useState(new Date())
    const cachedData = client.readQuery<FeedsResp>({
        query: QUERY_GET_FEEDS,
        variables: { year: dateFns.getYear(currentDate),
            month: dateFns.getMonth(currentDate)
        }})?.lastMonthFeeds;

    const filteredData = cachedData?.filter((item) => {
        return dateFns.isSameDay(match.params.date, item.timestamp)
    })

    console.log(cachedData, filteredData)

    return <div>DAY PAGE</div>
}