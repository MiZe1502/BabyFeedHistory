import Typography from "@material-ui/core/Typography";
import {symbols} from "../../../common/utils/symbols";
import React from "react";
import {FeedItemDetails} from "../../../api/feedDetails/queries";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

import css from "./FeedDetailsSimpleItem.scss";

interface FeedDetailsSimpleItemProps {
    detailsItem: FeedItemDetails;
}

export const FeedDetailsSimpleItem = ({detailsItem}: FeedDetailsSimpleItemProps) => {
    let checkedComponent = null;

    if (detailsItem.type === "checkedValue") {
        if (detailsItem.wasGiven) {
            checkedComponent = <CheckBoxIcon />
        } else {
            checkedComponent = <CheckBoxOutlineBlankIcon />
        }
    }

    return <div className={css.DetailsItem}>
        <Typography className={css.DetailsValue} variant="body1" component="div">
            {detailsItem.name}
        </Typography>
        <Typography className={css.DetailsValue} variant="body1" component="div">
            {`${detailsItem.amount} ${detailsItem.amountOfWhat}`}
        </Typography>
        {checkedComponent}
    </div>
}