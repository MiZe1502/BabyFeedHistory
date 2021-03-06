import {IntlShape, useIntl} from "react-intl";
import {useState} from "react";
import {ApolloError, useMutation} from "@apollo/client";
import {
    FeedRemovedResp,
    MUTATION_REMOVE_FEED_ITEM
} from "../../../../api/feedItems/mutations";
import {FeedItemProps} from "./FeedItem";
import {useAuth} from "../../../../common/hooks/useAuth";

export const feedItemTimeFormat = 'HH:mm';

interface UseFeedItemRet {
    intl: IntlShape;
    error?: ApolloError;
    loading: boolean;
    isRemove: boolean;
    isEdit: boolean;
    openEditPopup: () => void;
    closeEditPopup: () => void;
    openRemovePopup: () => void;
    closeRemovePopup: () => void;
    removeFeedItem: () => void;
}

export const useFeedItem = ({item}: FeedItemProps): UseFeedItemRet => {
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

    const [removeMethod, {error, loading}] = useMutation<FeedRemovedResp>(MUTATION_REMOVE_FEED_ITEM)

    auth?.logoutIfAuthError(error);

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

    return {
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
    }
}