import Typography from "@material-ui/core/Typography";
import {symbols} from "../../../common/utils/symbols";
import React from "react";
import {FeedItemDetails} from "../../../api/feedDetails/queries";

import css from "./FeedDetailsItemData.scss";
import Divider from "@material-ui/core/Divider";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

interface FeedDetailsItemDataProps {
    detailsItem: FeedItemDetails;
}

export const FeedDetailsItemData = ({detailsItem}: FeedDetailsItemDataProps) => {
    let checkedComponent = null;

    if (detailsItem.type === "checkedValue") {
        if (detailsItem.wasGiven) {
            checkedComponent = <CheckBoxIcon />
        } else {
            checkedComponent = <CheckBoxOutlineBlankIcon />
        }
    }

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
            {checkedComponent}
        </div>
    </div>
}