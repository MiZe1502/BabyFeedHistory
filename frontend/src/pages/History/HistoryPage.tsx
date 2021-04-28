import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import {CalendarHeader} from "./components/CalendarHeader/CalendarHeader";
import {CalendarDaysTitle} from "./components/CalendarDaysTitle/CalendarDaysTitle";
import {CalendarCells} from "./components/CalendarCells/CalendarCells";
import {useHistoryPage} from "./useHistoryPage";

import css from "./HistoryPage.scss";

export const HistoryPage = (): React.ReactElement => {
    const {
        loading,
        currentDate,
        historyData,
        handleNextMonth,
        handlePreviousMonth,
        onDayClick,
    } = useHistoryPage();

    return (
        <section className={css.Page}>
            {loading ? <CircularProgress size={16} disableShrink /> :
                <div>
                    <CalendarHeader currentDate={currentDate}
                                    handleNextMonth={handleNextMonth}
                                    handlePreviousMonth={handlePreviousMonth}/>
                    <CalendarDaysTitle currentDate={currentDate}/>
                    <CalendarCells
                        currentDate={currentDate}
                        data={historyData}
                        onDayClick={onDayClick}/>
                </div>
            }

        </section>
    );
}