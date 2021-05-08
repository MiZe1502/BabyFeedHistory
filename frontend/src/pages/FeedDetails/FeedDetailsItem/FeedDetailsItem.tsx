import {FeedItemDetails} from "../../../api/feedDetails/queries";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {FeedDetailsItemData} from "../FeedDetailsItemData/FeedDetailsItemData";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { RemoveFeedDetailsItemPopup } from "../RemoveFeedDetailsItemPopup/RemoveFeedDetailsItemPopup";
import {EditFeedDetailsPopup} from "../EditFeedDetailsPopup/EditFeedDetailsPopup";
import {useFeedDetailsItem} from "./useFeedDetailsItem";

import css from "./FeedDetailsItem.scss";

export interface FeedDetailsItemProps {
    detailsItem: FeedItemDetails;
}

export const FeedDetailsItem = ({detailsItem}: FeedDetailsItemProps) => {
    const {
        intl,
        isEdit,
        isRemove,
        loading,
        error,
        openEditPopup,
        openRemovePopup,
        closeEditPopup,
        closeRemovePopup,
        removeFeedItem,
    } = useFeedDetailsItem({detailsItem});

    return <Card key={detailsItem.key} className={css.FeedDetails}>
        <CardContent>
            <FeedDetailsItemData detailsItem={detailsItem} />
        </CardContent>
        <CardActions>
            <Button onClick={openEditPopup} size="small" color="primary">
                {intl.formatMessage({id: "FeedDetails.Card.Buttons.Edit"})}
            </Button>
            <Button onClick={openRemovePopup} size="small" color="secondary">
                {intl.formatMessage({id: "FeedDetails.Card.Buttons.Remove"})}
            </Button>
        </CardActions>
        {isRemove && <RemoveFeedDetailsItemPopup
            onClose={closeRemovePopup}
            onRemove={removeFeedItem}
            key={detailsItem.key}
            loading={loading}
            error={error?.message}/>}
        {isEdit && <EditFeedDetailsPopup
            onClose={closeEditPopup}
            feedDetails={detailsItem}/>}
    </Card>
}