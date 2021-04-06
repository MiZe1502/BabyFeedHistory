import React from "react";
import dateFns from "date-fns";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import css from "./CalendarHeader.scss";

interface CalendarHeaderProps {
    currentDate: Date;
    handleNextMonth: () => void;
    handlePreviousMonth: () => void;
}

export const CalendarHeader = ({currentDate,
                                   handleNextMonth,
                                   handlePreviousMonth}: CalendarHeaderProps) => {
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
};