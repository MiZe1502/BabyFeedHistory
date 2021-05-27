import {IntlShape, useIntl} from "react-intl";
import {useAuth} from "../../../common/hooks/useAuth";
import {useState} from "react";
import {ApolloError, useMutation} from "@apollo/client";
import {
    MUTATION_REMOVE_FEED_DETAILS,
    RemoveFeedDetailsResp
} from "../../../api/feedDetails/mutations";
import {FeedDetailsItemProps} from "./FeedDetailsItem";

interface UseFeedDetailsItemRet {
    intl: IntlShape;
    isEdit: boolean;
    isRemove: boolean;
    loading: boolean;
    error?: ApolloError;
    openEditPopup: () => void;
    openRemovePopup: () => void;
    closeEditPopup: () => void;
    closeRemovePopup: () => void;
    removeFeedItem: () => void;
}

export const useFeedDetailsItem = ({detailsItem}: FeedDetailsItemProps): UseFeedDetailsItemRet => {
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

    const [removeMethod, {error, loading}] = useMutation<RemoveFeedDetailsResp>(MUTATION_REMOVE_FEED_DETAILS)

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

    return {
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
    }
}