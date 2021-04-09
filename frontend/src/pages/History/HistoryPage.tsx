import React, {useState} from "react";
import dateFns from "date-fns";

import css from "./HistoryPage.scss";
import {useQuery} from "@apollo/client";
import {FeedsResp, FeedsVariables, QUERY_GET_FEEDS} from "./api";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useAuth} from "../../common/hooks/useAuth";
import {routes} from "../../utils/routes";
import { useHistory } from "react-router-dom";
import {CalendarHeader} from "./components/CalendarHeader/CalendarHeader";
import {CalendarDaysTitle} from "./components/CalendarDaysTitle/CalendarDaysTitle";
import {CalendarCells} from "./components/CalendarCells/CalendarCells";

export const HistoryPage = (): React.ReactElement => {
    const auth = useAuth();
    const history = useHistory();

    const [currentDate, setCurrentDate] = useState(new Date())

    const { loading, error, data } = useQuery<FeedsResp, FeedsVariables>(
        QUERY_GET_FEEDS,
        { variables: { year: dateFns.getYear(currentDate),
                month: dateFns.getMonth(currentDate) }  }
    );

    if (error && error.message === 'Authentication error') {
        auth?.logout();
    }

    const handleNextMonth = () => {
        setCurrentDate(dateFns.addMonths(currentDate, 1));
    }

    const handlePreviousMonth = () => {
        setCurrentDate(dateFns.subMonths(currentDate, 1));
    }

    const onDayClick = (day: string) => {
        history.push(routes.dayInHistory.replace(':date', day))
    }

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
                        data={data}
                        onDayClick={onDayClick}/>
                </div>
            }

        </section>
    );
}