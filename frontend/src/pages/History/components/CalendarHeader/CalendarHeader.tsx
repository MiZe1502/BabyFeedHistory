import React from "react";
import dateFns from "date-fns";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ru from "date-fns/locale/ru";
import en from "date-fns/locale/en";

import css from "./CalendarHeader.scss";
import {useAuth} from "../../../../common/hooks/useAuth";
import {capitalizeFirstLetter} from "../../../../common/utils/helpers";

interface CalendarHeaderProps {
    currentDate: Date;
    handleNextMonth: () => void;
    handlePreviousMonth: () => void;
}

const loc: Record<string, object> = {
    "ru": ru,
    "en": en,
}

export const CalendarHeader = ({currentDate,
                                   handleNextMonth,
                                   handlePreviousMonth}: CalendarHeaderProps) => {
    const auth = useAuth();

    const dateFormat = "MMMM, YYYY";

    const monthAndYear = capitalizeFirstLetter(dateFns.format(currentDate,
        dateFormat,
        {locale: loc[auth?.loc || "en"]}));

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
};