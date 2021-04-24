import {useEffect, useState} from "react";
import {FeedItem, FeedItemDetails} from "../../../History/api";
import {useIntl} from "react-intl";
import {useForm} from "react-hook-form";
import {useMutation, useSubscription} from "@apollo/client";
import {
    FeedUpdatedSubscrResp,
    MUTATION_CREATE_FEED_ITEM,
    MUTATION_EDIT_FEED_ITEM, SUBSCRIPTION_FEED_UPDATED
} from "./api";
import {EditFeedItemPopupProps} from "./EditFeedItemPopup";
import dateFns from "date-fns";
import {
    FeedDetailsCreatedSubscrResp,
    SUBSCRIPTION_FEED_DETAILS_CREATED
} from "../../../FeedDetails/api";

interface EditFeedItemForm extends FeedItem {
    time: string;
}

interface EditFeedItemResp {
    updateFeed: FeedItem[];
}

export const useEditFeedItemPopup = ({feedItem, onClose, currentDay}: EditFeedItemPopupProps) => {
    const [currentFeedItem, setCurrentFeedItem] = useState<FeedItem | undefined>(feedItem);
    const [isPopupOpened, setIsPopupOpened] = useState(false);

    useEffect(() => {
        setCurrentFeedItem(feedItem)
    }, [feedItem])

    const intl = useIntl();

    const {register, handleSubmit, formState: {errors}} = useForm<EditFeedItemForm>({});

    const [updateMethod, {error: updateError, loading: updateLoading}] =
        useMutation<EditFeedItemResp>(MUTATION_EDIT_FEED_ITEM)

    const [createMethod, {error: createError, loading: createLoading}] =
        useMutation<EditFeedItemResp>(MUTATION_CREATE_FEED_ITEM)

    const onSubmit = (data: EditFeedItemForm) => {
        const time = data.time;
        const hours = +time.split(':')[0];
        const minutes = +time.split(':')[1];

        const timestamp = !feedItem && currentDay ?
            dateFns.startOfDay(currentDay).getTime() :
            currentFeedItem?.timestamp

        const date = new Date(timestamp || 0);
        date.setHours(hours);
        date.setMinutes(minutes);

        const newFeedItem = {
            ...currentFeedItem,
            timestamp: date.getTime(),
        }

        if (!feedItem) {
            onCreateFeedItem(newFeedItem as FeedItem);
        } else {
            onEditFeedItem(newFeedItem as FeedItem);
        }
    }

    const onEditFeedItem = (data: FeedItem) => {
        updateMethod({variables: {
                feedItem: data,
            }})
            .then((res) => {
                console.log(res)
                onCancel();
            })
            .catch((err) => {
                console.log(err)
            });
    }


    const onCreateFeedItem = (data: FeedItem) => {
        createMethod({variables: {
                feedItem: data,
            }})
            .then((res) => {
                console.log(res)
                onCancel();
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const onCancel = () => {
        onClose?.();
    }

    const onAddNewFeedDetails = (item: FeedItemDetails) => {
        const details = currentFeedItem?.details || [];
        setCurrentFeedItem({
            ...currentFeedItem,
            details: [
                ...details,
                item
            ]
        } as FeedItem)
    }

    const onRemoveFeedDetailsFromItem = (index: number) => {
        const curFeedItem = {...currentFeedItem};
        curFeedItem.details = [...(curFeedItem.details?.slice(0, index) || []),
            ...(curFeedItem.details?.slice(index + 1, curFeedItem.details?.length) || [])]

        setCurrentFeedItem({
            ...curFeedItem
        } as FeedItem)
    }

    const onCreateNewFeedDetailsPopupClose = () => {
        setIsPopupOpened(false);
    }

    const onCreateNewFeedDetailsPopupOpen = () => {
        setIsPopupOpened(true);
    }

    return {
        currentFeedItem,
        updateLoading,
        errors,
        intl,
        register,
        handleSubmit,
        updateError,
        createError,
        createLoading,
        isPopupOpened,
        onSubmit,
        onAddNewFeedDetails,
        onRemoveFeedDetailsFromItem,
        onCancel,
        onCreateNewFeedDetailsPopupClose,
        onCreateNewFeedDetailsPopupOpen,
    }
}