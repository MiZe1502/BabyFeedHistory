import React, {useCallback, useEffect, useState} from "react";
import dateFns from "date-fns";
// @ts-ignore
import { ru } from 'date-fns/locale'
import cn from "classnames";
// //@ts-ignore
// import Calendar from "react-material-ui-calendar";

import css from "./HistoryPage.scss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {useQuery} from "@apollo/client";
import {FeedsResp, FeedsVariables, QUERY_GET_FEEDS} from "./api";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import {useAuth} from "../../common/hooks/useAuth";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import IconButton from "@material-ui/core/IconButton";

export const HistoryPage = (): React.ReactElement => {
    const auth = useAuth();

    const [currentDate, setCurrentDate] = useState(new Date())

    const { loading, error, data } = useQuery<FeedsResp, FeedsVariables>(
        QUERY_GET_FEEDS,
        { variables: { year: dateFns.getYear(currentDate),
                month: dateFns.getMonth(currentDate) }  }
    );

    console.log(loading, error, data)

    if (error && error.message === 'Authentication error') {
        auth?.logout();
    }

    const handleNextMonth = () => {
        setCurrentDate(dateFns.addMonths(currentDate, 1));
    }

    const handlePreviousMonth = () => {
        setCurrentDate(dateFns.subMonths(currentDate, 1));

    }

    const renderHeader = useCallback(() => {
        const dateFormat = "MMMM, YYYY";

        const monthAndYear = dateFns.format(currentDate, dateFormat)

        return <div className={css.Header}>
            <Typography component="h1">
                <Box className={css.HeaderText}>
                    <IconButton
                        aria-label="previous month"
                        onClick={handlePreviousMonth}
                    >
                        <NavigateBeforeIcon />
                    </IconButton>
                    {monthAndYear}
                    <IconButton
                        aria-label="next month"
                        onClick={handleNextMonth}
                    >
                        <NavigateNextIcon />
                    </IconButton>
                </Box>
            </Typography>
        </div>
    }, [currentDate, data])

    const renderDaysTitle = useCallback(() => {
        const dateFormat = "dddd";
        const days = [];

        const startDate = dateFns.startOfWeek(currentDate, {weekStartsOn: 1});

        for (let i = 0; i < 7; i++) {
            days.push(
                <Typography component="h4" key={i} className={css.TitleItem}>
                    <Box className={css.DayTitle}>
                            {dateFns.format(dateFns.addDays(startDate, i),
                                dateFormat, {locale: ru})}
                    </Box>
                </Typography>
            );
        }

        return <div className={css.Row}>{days}</div>;
    }, [currentDate, data])

    const renderCells = useCallback(() => {
        const monthStart = dateFns.startOfMonth(currentDate);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart, {weekStartsOn: 1});
        const endDate = dateFns.endOfWeek(monthEnd, {weekStartsOn: 1});

        const dateFormat = "D";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                if (!dateFns.isSameMonth(day, monthStart)) {
                    days.push(<Card className={css.Item}>
                        <CardContent>
                        </CardContent>
                    </Card>)
                } else {
                    formattedDate = dateFns.format(day, dateFormat);

                    const dayWithFeeds = data?.lastMonthFeeds?.filter(
                        (feedItem) =>
                            dateFns.getDate(feedItem.timestamp) ===
                            dateFns.getDate(day));

                    const hasFeed = dayWithFeeds && dayWithFeeds?.length > 0;
                    const feedsCount = dayWithFeeds?.length;

                    console.log(data, dayWithFeeds, hasFeed, feedsCount)

                    days.push(
                        <Card className={cn(css.Item, css.ActiveItem)}>
                            <CardContent>
                                <Typography color="textSecondary">
                                    <Box className={css.Day}>
                                        {formattedDate}
                                    </Box>
                                    {hasFeed && <Paper className={css.Counter}
                                           component='div' square={false}>
                                        <Typography>
                                            <Box className={css.CounterItem}>
                                                {feedsCount}
                                            </Box>
                                        </Typography>
                                    </Paper>}
                                </Typography>
                            </CardContent>
                        </Card>)
                }

                day = dateFns.addDays(day, 1);
            }

            rows.push(<div className={css.Row}>
                {days}
            </div>)

            days = [];
        }

        return rows
    }, [currentDate, data])


    return (
        <section className={css.Page}>
            {loading ? <CircularProgress size={16} disableShrink /> :
                <div>
                    {renderHeader()}
                    {renderDaysTitle()}
                    {renderCells()}
                </div>
            }

        </section>
    );
}