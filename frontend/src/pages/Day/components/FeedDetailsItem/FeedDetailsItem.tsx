import React from "react";
import {FeedItemDetails} from "../../../History/api";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import css from "./FeedDetailsItem.scss";
import Typography from "@material-ui/core/Typography";
import {symbols} from "../../../../common/utils/symbols";

interface FeedDetailsItemProps {
    feedDetails?: FeedItemDetails[]
}

export const FeedDetailsItem = ({feedDetails}: FeedDetailsItemProps) => {
    return <List component="div">
        {feedDetails?.map((detailsItem) => {
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
}