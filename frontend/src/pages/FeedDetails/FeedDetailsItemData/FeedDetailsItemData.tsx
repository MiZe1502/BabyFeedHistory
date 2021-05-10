import Typography from "@material-ui/core/Typography";
import React from "react";
import {FeedItemDetails} from "../../../api/feedDetails/queries";
import Divider from "@material-ui/core/Divider";
import {CheckedIndicator} from "../CheckedIndicator/CheckedIndicator";

import css from "./FeedDetailsItemData.scss";

interface FeedDetailsItemDataProps {
    detailsItem: FeedItemDetails;
}

export const FeedDetailsItemData = ({detailsItem}: FeedDetailsItemDataProps) => {
    return <div className={css.FeedDetailsWrapper}>
        <Typography className={css.DetailsValue} variant="h6" component="div">
            {detailsItem.name}
        </Typography>
        <div className={css.Divider}>
            <Divider/>
        </div>
        <div className={css.FeedDetailsItemData}>
            {detailsItem.type !== "checkedValue" && <Typography className={css.DetailsValue} variant="body1" component="div">
                {`${detailsItem.amount} ${detailsItem.amountOfWhat}`}
            </Typography>}
            <CheckedIndicator type={detailsItem.type} wasGiven={detailsItem.wasGiven}/>
        </div>
    </div>
}