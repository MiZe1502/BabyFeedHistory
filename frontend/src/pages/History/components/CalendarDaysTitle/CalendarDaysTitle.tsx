import React from "react";
import dateFns from "date-fns";
// @ts-ignore
import { ru } from 'date-fns/locale'

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import css from "./CalendarDaysTitle.scss";

interface CalendarDaysTitleProps {
    currentDate: Date;
}

export const CalendarDaysTitle = ({currentDate}: CalendarDaysTitleProps) => {
    const dateFormat = "dddd";
    const days = [];

    const startDate = dateFns.startOfWeek(currentDate, {weekStartsOn: 1});

    for (let i = 0; i < 7; i++) {
        days.push(
            <Typography component="h4" key={`title-${i}`} className={css.TitleItem}>
                <Box className={css.DayTitle}>
                    {dateFns.format(dateFns.addDays(startDate, i),
                        dateFormat, {locale: ru})}
                </Box>
            </Typography>
        );
    }

    return <div className={css.Row}>{days}</div>;
}