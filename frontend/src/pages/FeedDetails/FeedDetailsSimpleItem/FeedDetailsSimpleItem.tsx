import Typography from "@material-ui/core/Typography";
import React from "react";
import {FeedItemDetails} from "../../../api/feedDetails/queries";
import {CheckedIndicator} from "../CheckedIndicator/CheckedIndicator";

import css from "./FeedDetailsSimpleItem.scss";

interface FeedDetailsSimpleItemProps {
    detailsItem: FeedItemDetails;
}

export const FeedDetailsSimpleItem = ({detailsItem}: FeedDetailsSimpleItemProps) => {
    return <div className={css.DetailsItem}>
        <Typography className={css.DetailsValue} variant="body1" component="div">
            {detailsItem.name}
        </Typography>
        {detailsItem.type !== "checkedValue" && <Typography
            className={css.DetailsValue} variant="body1" component="div">
            {`${detailsItem.amount} ${detailsItem.amountOfWhat}`}
        </Typography>}
        <CheckedIndicator type={detailsItem.type} wasGiven={detailsItem.wasGiven}/>
    </div>
}