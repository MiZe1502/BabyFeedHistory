import Typography from "@material-ui/core/Typography";
import {symbols} from "../../../common/utils/symbols";
import React from "react";
import {FeedItemDetails} from "../../../api/feedDetails/queries";

import css from "./FeedDetailsSimpleItem.scss";

interface FeedDetailsSimpleItemProps {
    detailsItem: FeedItemDetails;
}

export const FeedDetailsSimpleItem = ({detailsItem}: FeedDetailsSimpleItemProps) => {
    return <div className={css.DetailsItem}>
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
}