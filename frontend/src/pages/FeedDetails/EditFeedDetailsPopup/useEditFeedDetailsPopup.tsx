import {useEffect, useState} from "react";
import {FeedItemDetails} from "../../History/api";
import {EditFeedDetailsPopupProps} from "./EditFeedDetailsPopup";
import {useIntl} from "react-intl";
import {useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {MUTATION_EDIT_FEED_ITEM} from "../../Day/components/EditFeedItemPopup/api";
import {EditFeedDetailsResp, MUTATION_EDIT_FEED_DETAILS} from "../api";

interface FeedItemDetailsForm extends FeedItemDetails {}

export const useEditFeedDetailsPopup = ({feedDetails, onClose}: EditFeedDetailsPopupProps) => {
    const [currentFeedDetails, setCurrentFeedDetails] = useState<FeedItemDetails | undefined>(feedDetails);

    useEffect(() => {
        setCurrentFeedDetails(feedDetails)
    }, [feedDetails])

    const {register, handleSubmit, formState: {errors}} = useForm<FeedItemDetailsForm>({});

    const intl = useIntl();

    const [updateMethod, {error: updateError, loading: updateLoading}] =
        useMutation<EditFeedDetailsResp>(MUTATION_EDIT_FEED_DETAILS)

    const onCancel = () => {
        onClose?.();
    }

    const onSubmit = () => {

    }

    return {
        currentFeedDetails,
        register,
        handleSubmit,
        errors,
        intl,
        updateLoading,
        onSubmit,
        onCancel,
    }
}