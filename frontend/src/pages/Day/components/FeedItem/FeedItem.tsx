import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import dateFns from "date-fns";
import Divider from "@material-ui/core/Divider";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {FeedDetailsItem} from "../FeedDetailsItem/FeedDetailsItem";
import {EditFeedItemPopup} from "../EditFeedItemPopup/EditFeedItemPopup";
import {RemoveFeedItemPopup} from "../RemoveFeedItemPopup/RemoveFeedItemPopup";
import {FeedItem} from "../../../../api/feedItems/queries";
import {feedItemTimeFormat, useFeedItem} from "./useFeedItem";

import css from "./FeedItem.scss";

export interface FeedItemProps {
    item: FeedItem;
    key: number;
}

export const FeedItemComponent = ({item, key}: FeedItemProps): React.ReactElement => {
    const {
        intl,
        error,
        loading,
        isRemove,
        isEdit,
        openEditPopup,
        closeEditPopup,
        openRemovePopup,
        closeRemovePopup,
        removeFeedItem,
    } = useFeedItem({item, key});

    return <Card key={key} className={css.FeedItem}>
        <CardContent>
            <Typography variant="h5" component="h2">
                {dateFns.format(item.timestamp, feedItemTimeFormat)}
            </Typography>
            <Divider/>
            <FeedDetailsItem feedDetails={item?.details}/>
        </CardContent>
        <CardActions>
            <Button onClick={openEditPopup} size="small" color="primary">
                {intl.formatMessage({id: "FeedItem.Card.Buttons.Edit"})}
            </Button>
            <Button onClick={openRemovePopup} size="small" color="secondary">
                {intl.formatMessage({id: "FeedItem.Card.Buttons.Remove"})}
            </Button>
        </CardActions>
        {isEdit && <EditFeedItemPopup onClose={closeEditPopup} feedItem={item}/>}
        {isRemove && <RemoveFeedItemPopup
            onClose={closeRemovePopup}
            onRemove={removeFeedItem}
            key={item.key}
            loading={loading}
            error={error?.message}/>}
    </Card>
}