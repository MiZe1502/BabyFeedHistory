import React, {useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import {FeedItem, FeedItemDetails} from "../../History/api";
import {Header} from "./components/Header/Header";
import css from "./EditFeedDetailsPopup.scss";
import {useEditFeedDetailsPopup} from "./useEditFeedDetailsPopup";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {FormattedMessage} from "react-intl";
import {ButtonWithLoading} from "../../../common/components/ButtonWithLoading/ButtonWithLoading";
import {TextFieldWrapped} from "../../../common/components/TextField/TextField";

export interface EditFeedDetailsPopupProps {
    feedDetails?: FeedItemDetails;
    onClose?: () => void;
}

export const EditFeedDetailsPopup = (props: EditFeedDetailsPopupProps) => {

    const {currentFeedDetails,
        register,
        handleSubmit,
        errors,
        intl,
        updateLoading,
        onSubmit,
        onCancel} = useEditFeedDetailsPopup(props)

    return <Dialog open={true}>
        <div className={css.PopupTitleWrapper}>
            <Header currentFeedDetails={currentFeedDetails} onCancel={onCancel}/>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
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
            </DialogContent>
            <DialogActions>
                <ButtonWithLoading
                    loading={updateLoading}
                    locId='FeedDetails.Card.Edit.Buttons.Save' />
                <Button onClick={onCancel} color="secondary">
                    <FormattedMessage id="FeedDetails.Card.Edit.Buttons.Cancel" />
                </Button>
            </DialogActions>
        </form>
    </Dialog>
}