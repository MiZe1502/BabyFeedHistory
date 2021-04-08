import React, {useState} from "react";
import {client} from "../../api";
import {FeedsResp, FeedsVariables, QUERY_GET_FEEDS} from "../History/api";
import dateFns from "date-fns";

export const DayPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const cachedData = client.readQuery<FeedsResp>({
        query: QUERY_GET_FEEDS,
        variables: { year: dateFns.getYear(currentDate),
            month: dateFns.getMonth(currentDate)
        }})?.lastMonthFeeds;

    console.log(cachedData)

    return <div>DAY PAGE</div>
}