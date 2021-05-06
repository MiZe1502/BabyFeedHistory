import Typography from "@material-ui/core/Typography";
import {symbols} from "../../../common/utils/symbols";
import React from "react";
import {FeedItemDetails} from "../../../api/feedDetails/queries";

import css from "./FeedDetailsItemData.scss";
import Divider from "@material-ui/core/Divider";

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
    </div>
}