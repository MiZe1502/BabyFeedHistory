import React, {useState} from "react";
import {client} from "../../api";
import {FeedsResp, QUERY_GET_FEEDS} from "../History/api";
import dateFns from "date-fns";
import { useRouteMatch } from "react-router-dom";
import css from "./DayPage.scss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useIntl } from "react-intl";
import {FeedItemComponent} from "./components/FeedItem/FeedItem";

export const DayPage = () => {
    const match = useRouteMatch<{date: string}>();
    const intl = useIntl();

    const [currentDate, setCurrentDate] = useState(new Date())
    const cachedData = client.readQuery<FeedsResp>({
        query: QUERY_GET_FEEDS,
        variables: { year: dateFns.getYear(currentDate),
            month: dateFns.getMonth(currentDate)
        }})?.lastMonthFeeds;

    const filteredData = cachedData?.filter((item) => {
        return dateFns.isSameDay(match.params.date, item.timestamp)
    })

    let component = null;
    if (filteredData && filteredData.length > 0) {
     component = filteredData?.map((item) => {
        return <FeedItemComponent key={item.timestamp} item={item}/>
     })
    } else {
        component = <Card className={css.FeedItem}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {intl.formatMessage({id: "Messages.NoDataFound"})}
                </Typography>
            </CardContent>
        </Card>
    }

    return <div className={css.DayPage}>{component}</div>
}