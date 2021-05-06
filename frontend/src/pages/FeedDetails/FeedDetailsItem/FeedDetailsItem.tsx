import {FeedItemDetails} from "../../../api/feedDetails/queries";
import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import css from "./FeedDetailsItem.scss";
import CardContent from "@material-ui/core/CardContent";
import {FeedDetailsItemData} from "../FeedDetailsItemData/FeedDetailsItemData";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { useIntl } from "react-intl";
import {useAuth} from "../../../common/hooks/useAuth";
import {useMutation} from "@apollo/client";
import {
    FeedRemovedResp,
    MUTATION_REMOVE_FEED_ITEM
} from "../../../api/feedItems/mutations";
import {MUTATION_REMOVE_FEED_DETAILS} from "../../../api/feedDetails/mutations";

interface FeedDetailsItemProps {
    detailsItem: FeedItemDetails;
}

export const FeedDetailsItem = ({detailsItem}: FeedDetailsItemProps) => {
    const intl = useIntl();
    const auth = useAuth();

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

    const [removeMethod, {error, loading}] = useMutation<FeedRemovedResp>(MUTATION_REMOVE_FEED_DETAILS)

    auth?.logoutIfAuthError(error);

    const removeFeedItem = () => {
        removeMethod({variables: {
                key: detailsItem.key,
            }})
            .then((res) => {
                console.log(res)
                closeRemovePopup();
            })
            .catch((err) => {
                console.log(err)
            });
    }

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
    </Card>
}