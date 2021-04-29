import {useEffect, useState} from "react";
import {useIntl} from "react-intl";
import {useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";

import {EditFeedItemPopupProps} from "./EditFeedItemPopup";
import dateFns from "date-fns";
import {
    MUTATION_CREATE_FEED_ITEM,
    MUTATION_EDIT_FEED_ITEM
} from "../../../../api/feedItems/mutations";
import {FeedItem} from "../../../../api/feedItems/queries";
import {FeedItemDetails} from "../../../../api/feedDetails/queries";
import {useAuth} from "../../../../common/hooks/useAuth";

export const parseTimestamp = (ts?: number): string => {
    if (!ts) {
        return '00:00';
    }
    const format = "HH:mm";
    return dateFns.format(ts!, format);
}

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
    const auth = useAuth();

    const {register, handleSubmit, formState: {errors}} = useForm<EditFeedItemForm>({});

    const [updateMethod, {error: updateError, loading: updateLoading}] =
        useMutation<EditFeedItemResp>(MUTATION_EDIT_FEED_ITEM)

    const [createMethod, {error: createError, loading: createLoading}] =
        useMutation<EditFeedItemResp>(MUTATION_CREATE_FEED_ITEM)

    auth?.logoutIfAuthError(updateError);
    auth?.logoutIfAuthError(createError);

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