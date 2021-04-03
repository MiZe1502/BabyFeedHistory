import React, {useState} from "react";
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

export const HistoryPage = (): React.ReactElement => {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())

    const renderHeader = () => {
        const dateFormat = "MMMM YYYY";
    }

    const renderDaysTitle = () => {
        const dateFormat = "dddd";
        const days = [];

        const startDate = dateFns.startOfWeek(currentMonth, {weekStartsOn: 1});

        for (let i = 0; i < 7; i++) {
            days.push(
                <Typography component="h4" key={i} className={css.Item}>
                    <Box className={css.DayTitle}>
                            {dateFns.format(dateFns.addDays(startDate, i),
                                dateFormat, {locale: ru})}
                    </Box>
                </Typography>
            );
        }

        return <div className={css.Row}>{days}</div>;
    }

    const renderCells = () => {
        const monthStart = dateFns.startOfMonth(currentMonth);
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

                    days.push(
                        <Card className={cn(css.Item, css.ActiveItem)}>
                            <CardContent>
                                <Typography color="textSecondary">
                                    <Box className={css.Day}>
                                        {formattedDate}
                                    </Box>
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
    }


    return (
        <section className={css.Page}>
            {renderDaysTitle()}
            {renderCells()}
        </section>
    );
}