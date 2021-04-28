import React from "react";
import Dialog from "@material-ui/core/Dialog";
import {Header} from "./components/Header/Header";
import {useEditFeedDetailsPopup} from "./useEditFeedDetailsPopup";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {FormattedMessage} from "react-intl";
import {ButtonWithLoading} from "../../../common/components/ButtonWithLoading/ButtonWithLoading";
import {TextFieldWrapped} from "../../../common/components/TextField/TextField";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup
} from "@material-ui/core";
import {Controller} from "react-hook-form";
import Checkbox from "@material-ui/core/Checkbox";
import {ErrorMessage} from "../../../common/components/ErrorMessage/ErrorMessage";
import {FeedItemDetails} from "../../../api/feedDetails/queries";

import css from "./EditFeedDetailsPopup.scss";

export interface EditFeedDetailsPopupProps {
    feedDetails?: FeedItemDetails;
    onClose?: () => void;
}

export const EditFeedDetailsPopup = (props: EditFeedDetailsPopupProps) => {

    const {currentFeedDetails,
        setCurrentFeedDetails,
        register,
        handleSubmit,
        errors,
        intl,
        updateLoading,
        control,
        createError,
        createLoading,
        updateError,
        onSubmit,
        onCancel} = useEditFeedDetailsPopup(props)

    return <Dialog open={true}>
        <div className={css.PopupTitleWrapper}>
            <Header currentFeedDetails={currentFeedDetails} onCancel={onCancel}/>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate
              autoComplete="off">
            <DialogContent>
                <div className={css.InnerWrapper}>
                    <TextFieldWrapped
                        inputRef={register({
                            required: intl.formatMessage({
                                id: "FeedDetails.Card.Edit.Fields.Name.Required"}),
                        })}
                        defaultValue={currentFeedDetails?.name || ""}
                        placeholder="Name"
                        id="name"
                        name="name"
                        label={intl.formatMessage({id: "FeedDetails.Card.Edit.Fields.Name"})}
                        type="text"
                        disabled={updateLoading || createLoading}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                    />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">
                            <FormattedMessage id="FeedDetails.Card.Edit.Fields.Type"/>
                        </FormLabel>
                        <Controller
                            rules={{ required: true }}
                            control={control}
                            defaultValue="valueWithAmount"
                            name="type"
                            render={({ name, onBlur, onChange, value }) => (
                                <RadioGroup
                                    value={currentFeedDetails?.type}
                                    onChange={(e) => {
                                        setCurrentFeedDetails({
                                            ...currentFeedDetails,
                                            type: e.target.value,
                                        })
                                    }}>
                                    <FormControlLabel
                                        disabled={updateLoading || createLoading}
                                        value="valueWithAmount"
                                        control={<Radio />}
                                        label={intl.formatMessage(
                                            {id: "FeedDetails.Card.Edit.Fields.Type.ValueWithAmount"
                                            })}
                                    />
                                    <FormControlLabel
                                        disabled={updateLoading || createLoading}
                                        value="checkedValue"
                                        control={<Radio />}
                                        label={intl.formatMessage(
                                            {id: "FeedDetails.Card.Edit.Fields.Type.CheckedValue"
                                            })}
                                    />
                                </RadioGroup>
                            )}
                        />
                    </FormControl>
                    {currentFeedDetails?.type === 'valueWithAmount' ?
                        <>
                            <TextFieldWrapped
                                inputRef={register({
                                    min: {
                                        value: 1,
                                        message: intl.formatMessage(
                                            {id: "FeedDetails.Card.Edit.Fields.Amount.MoreThanZero"
                                            }),
                                    },
                                    required: intl.formatMessage({
                                        id: "FeedDetails.Card.Edit.Fields.Amount.Required"
                                    }),
                                })}
                                defaultValue={currentFeedDetails?.amount}
                                placeholder="Amount"
                                id="amount"
                                name="amount"
                                label={intl.formatMessage({id: "FeedDetails.Card.Edit.Fields.Amount"})}
                                type="number"
                                disabled={updateLoading || createLoading}
                                error={Boolean(errors.amount)}
                                helperText={errors.amount?.message}
                            />
                            <TextFieldWrapped
                                inputRef={register({
                                    required: intl.formatMessage({
                                        id: "FeedDetails.Card.Edit.Fields.AmountOfWhat.Required"
                                    }),
                                })}
                                defaultValue={currentFeedDetails?.amountOfWhat}
                                placeholder="Units"
                                id="amountOfWhat"
                                name="amountOfWhat"
                                label={intl.formatMessage({id: "FeedDetails.Card.Edit.Fields.AmountOfWhat"})}
                                type="text"
                                disabled={updateLoading}
                                error={Boolean(errors.amountOfWhat)}
                                helperText={errors.amountOfWhat?.message}
                            />
                        </> :
                        <><FormControlLabel
                            disabled={updateLoading || createLoading}
                            value={currentFeedDetails?.wasGiven}
                            control={<Checkbox color="primary"/>}
                            label={intl.formatMessage({id: "FeedDetails.Card.Edit.Fields.WasGiven"})}
                            name='wasGiven'
                            inputRef={register}
                        /></>
                    }
                </div>
                <ErrorMessage
                    showError={Boolean(updateError) || Boolean(createError)}
                    errorMessage={updateError?.message || createError?.message}/>
            </DialogContent>
            <DialogActions>
                <ButtonWithLoading
                    loading={updateLoading || createLoading}
                    locId='FeedDetails.Card.Edit.Buttons.Save' />
                <Button onClick={onCancel} color="secondary">
                    <FormattedMessage id="FeedDetails.Card.Edit.Buttons.Cancel" />
                </Button>
            </DialogActions>
        </form>
    </Dialog>
}