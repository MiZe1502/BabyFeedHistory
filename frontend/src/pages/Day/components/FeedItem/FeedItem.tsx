import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import css from "./FeedItem.scss";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import dateFns from "date-fns";
import Divider from "@material-ui/core/Divider";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { useIntl } from "react-intl";
import {FeedDetailsItem} from "../FeedDetailsItem/FeedDetailsItem";
import {EditFeedItemPopup} from "../EditFeedItemPopup/EditFeedItemPopup";
import {RemoveFeedItemPopup} from "../RemoveFeedItemPopup/RemoveFeedItemPopup";
import {useMutation} from "@apollo/client";
import {
    FeedRemovedResp,
    MUTATION_REMOVE_FEED_ITEM
} from "../../../../api/feedItems/mutations";
import {FeedItem} from "../../../../api/feedItems/queries";

interface FeedItemProps {
    item: FeedItem;
    key: number;
}

const format = 'HH:mm';

export const FeedItemComponent = ({item, key}: FeedItemProps) => {
    const intl = useIntl();
    const [isEdit, setIsEdit] = useState(false);
    const [isRemove, setIsRemove] = useState(false);

    const openEditPopup = () => {
        setIsEdit(true);
    }

    const closeEditPopup = () => {
        setIsEdit(false);
    }

    const openRemovePopup = () => {
        setIsRemove(true);
    }

    const closeRemovePopup = () => {
        setIsRemove(false);
    }

    const [removeMethod, {error, loading}] = useMutation<FeedRemovedResp>(MUTATION_REMOVE_FEED_ITEM)

    const removeFeedItem = () => {
        removeMethod({variables: {
                key: item.key,
            }})
            .then((res) => {
                console.log(res)
                closeRemovePopup();
            })
            .catch((err) => {
                console.log(err)
            });
    }

    return <Card key={key} className={css.FeedItem}>
        <CardContent>
            <Typography variant="h5" component="h2">
                {dateFns.format(item.timestamp, format)}
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