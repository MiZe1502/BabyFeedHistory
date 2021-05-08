import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {ErrorMessage} from "../../common/components/ErrorMessage/ErrorMessage";
import Typography from "@material-ui/core/Typography";
import {FeedDetailsItem} from "./FeedDetailsItem/FeedDetailsItem";
import { AddNewFeedDetailsItem } from "./AddNewFeedDetailsItem/AddNewFeedDetailsItem";
import {useFeedDetailsPage} from "./useFeedDetailsPage";

import css from "./FeedDetailsPage.scss";

export const FeedDetailsPage = () => {
    const {
        intl,
        loading,
        data,
        availableFeedDetails,
        error
    } = useFeedDetailsPage();

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
        {!error && <AddNewFeedDetailsItem />}
        {component}
    </div>
}