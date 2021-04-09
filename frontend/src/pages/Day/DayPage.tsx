import React, {useState} from "react";
import {client} from "../../api";
import {FeedsResp, QUERY_GET_FEEDS} from "../History/api";
import dateFns from "date-fns";
import { useRouteMatch } from "react-router-dom";
import css from "./DayPage.scss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import {symbols} from "../../common/utils/symbols";

export const DayPage = () => {
    const match = useRouteMatch<{date: string}>();

    const [currentDate, setCurrentDate] = useState(new Date())
    const cachedData = client.readQuery<FeedsResp>({
        query: QUERY_GET_FEEDS,
        variables: { year: dateFns.getYear(currentDate),
            month: dateFns.getMonth(currentDate)
        }})?.lastMonthFeeds;

    const filteredData = cachedData?.filter((item) => {
        return dateFns.isSameDay(match.params.date, item.timestamp)
    })

    const format = 'HH:mm';

    return <div className={css.DayPage}>{
        filteredData?.map((item) => {
            return <Card className={css.FeedItem}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {dateFns.format(item.timestamp, format)}
                    </Typography>
                    <Divider/>
                    <List component="div">
                        {item.details?.map((detailsItem) => {
                            return <ListItem>
                                <div className={css.DetailsItem}>
                                    <Typography className={css.DetailsValue} variant="body1" component="div">
                                        {detailsItem.name}
                                    </Typography>
                                    <Typography className={css.DetailsValue} variant="body1" component="div">
                                        {`${detailsItem.amount} ${detailsItem.amountOfWhat}`}
                                    </Typography>
                                    <Typography className={css.DetailsValue} variant="body1" component="div">
                                        {detailsItem.type}
                                    </Typography>
                                    <Typography className={css.DetailsValue} variant="body1" component="div">
                                        {detailsItem.wasGiven || symbols.emDash}
                                    </Typography>
                                </div>
                            </ListItem>
                        })}
                    </List>
                </CardContent>
            </Card>
        })
    }</div>
}