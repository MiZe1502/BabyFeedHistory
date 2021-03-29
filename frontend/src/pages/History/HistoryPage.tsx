import React, {useState} from "react";
import dateFns from "date-fns";
// @ts-ignore
import { ru } from 'date-fns/locale'
// //@ts-ignore
// import Calendar from "react-material-ui-calendar";

import css from "./HistoryPage.scss";
import {Card, CardContent, Typography} from "@material-ui/core";

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
                <div className={css.Item} key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i),
                        dateFormat, {locale: ru})}
                </div>
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
                        <Card className={css.Item}>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    {formattedDate}
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
        <div className="calendar">
            {renderDaysTitle()}
            {renderCells()}
        </div>
    );
}