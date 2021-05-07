import React, {useEffect, useState} from "react";

import css from "./FeedDetailsPage.scss";
import {useLazyQuery} from "@apollo/client";
import {
    GetAvailableFeedDetailsResp,
    QUERY_GET_AVAILABLE_FEED_DETAILS
} from "../../api/feedDetails/queries";
import {useAvailableFeedDetailsState} from "../../state/useAvailableFeedDetailsState";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {ErrorMessage} from "../../common/components/ErrorMessage/ErrorMessage";
import {useIntl} from "react-intl";
import {useAuth} from "../../common/hooks/useAuth";
import Typography from "@material-ui/core/Typography";
import {FeedDetailsItem} from "./FeedDetailsItem/FeedDetailsItem";

export const FeedDetailsPage = () => {
    const auth = useAuth();
    const intl = useIntl();

    const {addItem,
        updateItem,
        removeItemByKey,
        availableFeedDetails, addItems} = useAvailableFeedDetailsState();

    const [getFeedDetails, {loading, data, error}] = useLazyQuery<GetAvailableFeedDetailsResp>(QUERY_GET_AVAILABLE_FEED_DETAILS)

    auth?.logoutIfAuthError(error);

    useEffect(() => {
        getFeedDetails();
    }, [])

    useEffect(() => {
        if (data) {
            addItems(data?.getAvailableFeedDetails || []);
        }
    }, [data])

    if (loading) {
        return <div className={css.FeedDetailsPage}>
            <CircularProgress size={54} disableShrink />
        </div>
    }

    let component = null;

    if (error) {
        component = <Card className={css.FeedDetails}>
            <CardContent>
                <ErrorMessage showError={true} errorMessage={error?.message}/>
            </CardContent>
        </Card>
    } else if (data) {
        component = <div className={css.FeedDetailsList}>
            {availableFeedDetails?.map((item) => {
                return <FeedDetailsItem detailsItem={item} />
            })}
        </div>;
    } else if (!data) {
        component = <Card className={css.FeedDetails}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {intl.formatMessage({id: "Messages.NoDataFound"})}
                </Typography>
            </CardContent>
        </Card>
    }

    return <div className={css.FeedDetailsPage}>
        {component}
    </div>
}