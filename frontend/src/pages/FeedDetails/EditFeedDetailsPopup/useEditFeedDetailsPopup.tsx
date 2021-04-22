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
    const [currentFeedDetails, setCurrentFeedDetails] =
        useState<FeedItemDetails>(
            feedDetails ||  {
        name: "",
        type: "valueWithAmount"
    });

    useEffect(() => {
        if (feedDetails) {
            setCurrentFeedDetails(feedDetails)
        }
    }, [feedDetails])

    const {register, handleSubmit, formState: {errors}, control} = useForm<FeedItemDetailsForm>({});

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
        setCurrentFeedDetails,
        register,
        handleSubmit,
        errors,
        intl,
        updateLoading,
        control,
        onSubmit,
        onCancel,
    }
}