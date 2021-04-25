import React from "react";
import css from "./DayPage.scss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {FeedItemComponent} from "./components/FeedItem/FeedItem";
import {AddNewFeedItem} from "./components/AddNewFeedItem/AddNewFeedItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import {ErrorMessage} from "../../common/components/ErrorMessage/ErrorMessage";
import {useDayPage} from "./useDayPage";

export const DayPage = (): React.ReactElement => {
    const {
        loading,
        error,
        filteredData,
        intl,
        ready
    } = useDayPage();

    if (loading) {
        return <div className={css.DayPage}>
            <CircularProgress size={54} disableShrink />
        </div>
    }

    let component = null;

    if (error) {
        component = <Card className={css.FeedItem}>
            <CardContent>
                <ErrorMessage showError={true} errorMessage={error?.message}/>
            </CardContent>
        </Card>
    } else if (ready) {
     component = filteredData?.map((item) => {
        return <FeedItemComponent key={item.timestamp} item={item}/>
     })
    } else if (!filteredData) {
        component = <Card className={css.FeedItem}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {intl.formatMessage({id: "Messages.NoDataFound"})}
                </Typography>
            </CardContent>
        </Card>
    }

    return <div className={css.DayPage}>
        {component}
        {!error && <AddNewFeedItem />}
    </div>
}