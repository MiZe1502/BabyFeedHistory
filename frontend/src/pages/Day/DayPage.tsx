import React, {useEffect, useState} from "react";
import {FeedItem} from "../History/api";
import { useRouteMatch } from "react-router-dom";
import css from "./DayPage.scss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useIntl } from "react-intl";
import {FeedItemComponent} from "./components/FeedItem/FeedItem";
import {useLazyQuery, useQuery, useSubscription} from "@apollo/client";
import {
    FeedRemovedSubscrResp,
    FeedUpdatedSubscrResp, SUBSCRIPTION_FEED_REMOVED,
    SUBSCRIPTION_FEED_UPDATED
} from "./components/EditFeedItemPopup/api";
import {useHistoryDataState} from "../History/state";
import {FeedsResp, FeedsVariables, QUERY_GET_FEEDS_FOR_DAY} from "./api";
import dateFns from "date-fns";

export const DayPage = () => {
    const match = useRouteMatch<{date: string}>();
    const intl = useIntl();

    const {historyData,
        addItems,
        updateItem,
        removeItemByKey,
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

    const { data: updated,
        loading: updatedLoading
    } = useSubscription<FeedUpdatedSubscrResp>(
        SUBSCRIPTION_FEED_UPDATED
    );

    const { data: removed,
        loading: removedLoading
    } = useSubscription<FeedRemovedSubscrResp>(
        SUBSCRIPTION_FEED_REMOVED
    );

    useEffect(() => {
        if (!updatedLoading && updated) {
            updateItem(updated?.feedUpdated || {})
        }
    }, [updated, updatedLoading])

    useEffect(() => {
        if (!removedLoading && removed) {
            removeItemByKey(removed?.feedRemoved?.key)
        }
    }, [removed, removedLoading])

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