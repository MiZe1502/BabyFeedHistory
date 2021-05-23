import React from "react";
import dateFns from "date-fns";
import ru from "date-fns/locale/ru";
import en from "date-fns/locale/en";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import css from "./CalendarDaysTitle.scss";
import {useAuth} from "../../../../common/hooks/useAuth";
import {capitalizeFirstLetter} from "../../../../common/utils/helpers";

interface CalendarDaysTitleProps {
    currentDate: Date;
}

const loc: Record<string, object> = {
    "ru": ru,
    "en": en,
}

export const CalendarDaysTitle = ({currentDate}: CalendarDaysTitleProps) => {
    const auth = useAuth();

    const dateFormat = "dddd";
    const days = [];

    const startDate = dateFns.startOfWeek(currentDate, {weekStartsOn: 1});

    for (let i = 0; i < 7; i++) {
        days.push(
            <Typography component="h4" key={`title-${i}`} className={css.TitleItem}>
                <Box className={css.DayTitle}>
                    {capitalizeFirstLetter(dateFns.format(dateFns.addDays(startDate, i),
                        dateFormat, {locale: loc[auth?.loc || "en"]}))}
                </Box>
            </Typography>
        );
    }

    return <div className={css.Row}>{days}</div>;
}