import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import css from "./FeedDetailsItem.scss";
import Typography from "@material-ui/core/Typography";
import {symbols} from "../../../../common/utils/symbols";
import {FeedItemDetails} from "../../../../api/feedDetails/queries";

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