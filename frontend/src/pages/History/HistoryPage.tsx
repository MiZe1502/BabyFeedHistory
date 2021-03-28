import React, {useState} from "react";
import dateFns from "date-fns";
// //@ts-ignore
// import Calendar from "react-material-ui-calendar";

import css from "./HistoryPage.scss";

export const HistoryPage = (): React.ReactElement => {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())

    const renderHeader = () => {
        const dateFormat = "MMMM YYYY";
    }

    const renderDaysTitle = () => {
        const dateFormat = "dddd";
        const days = [];

        const startDate = dateFns.startOfWeek(currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className={css.Item} key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return <div className={css.Row}>{days}</div>;
    }

    const renderCells = () => {
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = "D";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);

                days.push(<div className={css.Item}>
                    <span>{formattedDate}</span>
                </div>)

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