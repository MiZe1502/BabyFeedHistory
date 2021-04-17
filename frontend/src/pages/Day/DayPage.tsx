import React, {useEffect, useState} from "react";
import {client} from "../../api";
import {FeedItem, FeedsResp, QUERY_GET_FEEDS} from "../History/api";
import dateFns from "date-fns";
import { useRouteMatch } from "react-router-dom";
import css from "./DayPage.scss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useIntl } from "react-intl";
import {FeedItemComponent} from "./components/FeedItem/FeedItem";
import {useQuery, useSubscription} from "@apollo/client";
import {
    FeedUpdatedSubscrResp,
    SUBSCRIPTION_FEED_UPDATED
} from "./components/EditFeedItemPopup/api";
import {useRecoilState} from "recoil";
import {historyDataState, useHistoryDataState} from "../History/state";

export const DayPage = () => {
    const match = useRouteMatch<{date: string}>();
    const intl = useIntl();

    const {historyData,
        updateItem,
        getItemsForDay} = useHistoryDataState();

    const [filteredData, setFilteredData] = useState<FeedItem[]>([])

    const { data, loading, error } = useSubscription<FeedUpdatedSubscrResp>(
        SUBSCRIPTION_FEED_UPDATED
    );

    console.log('subscr', data, error);

    useEffect(() => {
        if (!loading && data) {
            updateItem(data?.feedUpdated || {})
        }
    }, [data, loading])

    useEffect(() => {
        setFilteredData(getItemsForDay(match.params.date))
    }, [historyData])

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