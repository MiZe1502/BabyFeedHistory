import React, {useEffect, useState} from "react";
import {FeedItem} from "../History/api";
import { useRouteMatch } from "react-router-dom";
import css from "./DayPage.scss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useIntl } from "react-intl";
import {FeedItemComponent} from "./components/FeedItem/FeedItem";
import {useSubscription} from "@apollo/client";
import {
    FeedRemovedSubscrResp,
    FeedUpdatedSubscrResp, SUBSCRIPTION_FEED_REMOVED,
    SUBSCRIPTION_FEED_UPDATED
} from "./components/EditFeedItemPopup/api";
import {useHistoryDataState} from "../History/state";

export const DayPage = () => {
    const match = useRouteMatch<{date: string}>();
    const intl = useIntl();

    const {historyData,
        updateItem,
        removeItemByKey,
        getItemsForDay} = useHistoryDataState();

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