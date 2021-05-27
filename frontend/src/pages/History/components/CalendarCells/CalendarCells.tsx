import React from "react";
import dateFns from "date-fns";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import cn from "classnames";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import {FeedItem} from "../../../../api/feedItems/queries";

import css from "./CalendarCells.scss";

interface CalendarCellsProps {
    currentDate: Date;
    data?: FeedItem[];
    onDayClick: (day: string) => void;
}

export const CalendarCells =
    ({currentDate, data, onDayClick}: CalendarCellsProps): React.ReactElement => {
    const monthStart = dateFns.startOfMonth(currentDate);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart, {weekStartsOn: 1});
    const endDate = dateFns.endOfWeek(monthEnd, {weekStartsOn: 1});

    const dateFormat = "D";
    const dateLinkFormat = 'YYYY-MM-DD'
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            const currentDay = day;
            const id = `day-${dateFns.getTime(currentDay)}-${i}`
            if (!dateFns.isSameMonth(currentDay, monthStart)) {
                days.push(<Card id={id} className={css.Item}>
                    <CardContent>
                    </CardContent>
                </Card>)
            } else {
                formattedDate = dateFns.format(currentDay, dateFormat);

                const dayWithFeeds = data?.filter(
                    (feedItem) =>
                        dateFns.getDate(feedItem.timestamp) ===
                        dateFns.getDate(currentDay));

                const hasFeed = dayWithFeeds && dayWithFeeds?.length > 0;
                const feedsCount = dayWithFeeds?.length;

                days.push(
                    <Card id={id} onClick={() =>
                        onDayClick(dateFns.format(currentDay, dateLinkFormat))}
                          className={cn(css.Item, css.ActiveItem)}>
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

            day = dateFns.addDays(currentDay, 1);
        }

        rows.push(<div id={`row-${dateFns.getTime(day)}`} className={css.Row}>
            {days}
        </div>)

        days = [];
    }

    return <>{rows.map((row) => row)}</>
}