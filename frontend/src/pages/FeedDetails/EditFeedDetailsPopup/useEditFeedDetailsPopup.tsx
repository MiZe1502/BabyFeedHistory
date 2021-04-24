import React, {useEffect, useState} from "react";
import {FeedItemDetails} from "../../History/api";
import {EditFeedDetailsPopupProps} from "./EditFeedDetailsPopup";
import {useIntl} from "react-intl";
import {useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {
    CreateFeedDetailsResp,
    EditFeedDetailsResp,
    MUTATION_CREATE_FEED_DETAILS,
    MUTATION_EDIT_FEED_DETAILS
} from "../api";

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

    const {register, handleSubmit, formState: {errors}, control, getValues} = useForm<FeedItemDetailsForm>({});

    const intl = useIntl();

    const [updateMethod, {error: updateError, loading: updateLoading}] =
        useMutation<EditFeedDetailsResp>(MUTATION_EDIT_FEED_DETAILS)

    const [createMethod, {error: createError, loading: createLoading}] =
        useMutation<CreateFeedDetailsResp>(MUTATION_CREATE_FEED_DETAILS)

    const onCancel = () => {
        onClose?.();
    }

    const onSubmit = () => {
        const formData = getValues();
        const data: FeedItemDetails = {
            ...currentFeedDetails,
            wasGiven: formData.wasGiven,
            amountOfWhat: formData.amountOfWhat,
            type: formData.type,
            name: formData.name,
            amount: Number(formData.amount),
        };
        console.log(data)

        if (currentFeedDetails?.key) {
            onEditFeedDetails(data);
        } else {
            onCreateFeedDetails(data);
        }
    }

    const onCreateFeedDetails = (data: FeedItemDetails) => {
        createMethod({variables: {
                feedDetails: data,
            }})
            .then((res) => {
                console.log(res)
                onCancel();
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const onEditFeedDetails = (data: FeedItemDetails) => {
        updateMethod({variables: {
                feedDetails: data,
            }})
            .then((res) => {
                console.log(res)
                onCancel();
            })
            .catch((err) => {
                console.log(err)
            });
    }

    useEffect(() => {
        console.log(errors)
    }, [errors])

    return {
        currentFeedDetails,
        setCurrentFeedDetails,
        register,
        handleSubmit,
        errors,
        intl,
        updateLoading,
        control,
        updateError,
        createError,
        createLoading,
        onSubmit,
        onCancel,
    }
}