import {useAuth} from "../../common/hooks/useAuth";
import {useHistory} from "react-router-dom";
import {useRecoilState} from "recoil";
import {historyDataState} from "../../state/useHistoryDataState";
import {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {
    FeedsResp,
    FeedsVariables,
    QUERY_GET_FEEDS
} from "../../api/feedItems/queries";
import dateFns from "date-fns";
import {routes} from "../../utils/routes";

export const useHistoryPage = () => {
    const auth = useAuth();
    const history = useHistory();

    const [historyData, setHistoryData] = useRecoilState(historyDataState);

    const [currentDate, setCurrentDate] = useState(new Date())

    const { loading, error, data } = useQuery<FeedsResp, FeedsVariables>(
        QUERY_GET_FEEDS,
        { variables: { year: dateFns.getYear(currentDate),
                month: dateFns.getMonth(currentDate) }  }
    );

    useEffect(() => {
        if (!loading && data) {
            setHistoryData(data?.lastMonthFeeds || [])
        }
    }, [loading, data])

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

    return {
        loading,
        currentDate,
        historyData,
        handleNextMonth,
        handlePreviousMonth,
        onDayClick,
    }
}