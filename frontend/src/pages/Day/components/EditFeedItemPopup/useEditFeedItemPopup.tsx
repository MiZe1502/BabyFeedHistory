import {useEffect, useState} from "react";
import {FeedItem, FeedItemDetails} from "../../../History/api";
import {useIntl} from "react-intl";
import {useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {MUTATION_EDIT_FEED_ITEM} from "./api";
import {EditFeedItemPopupProps} from "./EditFeedItemPopup";

interface EditFeedItemForm extends FeedItem {
    time: string;
}

interface EditFeedItemResp {
    updateFeed: FeedItem[];
}

export const useEditFeedItemPopup = ({feedItem, onClose}: EditFeedItemPopupProps) => {
    const [currentFeedItem, setCurrentFeedItem] = useState<FeedItem | undefined>(feedItem);

    useEffect(() => {
        setCurrentFeedItem(feedItem)
    }, [feedItem])

    const intl = useIntl();

    const {register, handleSubmit, formState: {errors}} = useForm<EditFeedItemForm>({});

    const [updateMethod, {error, loading}] =
        useMutation<EditFeedItemResp>(MUTATION_EDIT_FEED_ITEM)

    const onSubmit = (data: EditFeedItemForm) => {
        const time = data.time;
        const hours = +time.split(':')[0];
        const minutes = +time.split(':')[1];

        const date = new Date(currentFeedItem?.timestamp || 0);
        date.setHours(hours);
        date.setMinutes(minutes);

        const newFeedItem = {
            ...currentFeedItem,
            timestamp: date.getTime(),
        }

        onEditFeedItem(newFeedItem as FeedItem);
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

    return {
        currentFeedItem,
        loading,
        errors,
        intl,
        register,
        handleSubmit,
        error,
        onSubmit,
        onAddNewFeedDetails,
        onRemoveFeedDetailsFromItem,
        onCancel,
    }
}