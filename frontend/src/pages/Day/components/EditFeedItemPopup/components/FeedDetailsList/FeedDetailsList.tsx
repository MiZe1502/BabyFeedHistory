import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";
import {ErrorMessage} from "../../../../../../common/components/ErrorMessage/ErrorMessage";
import AddIcon from '@material-ui/icons/Add';
import {useFeedDetailsList} from "./useFeedDetailsList";
import {FeedItemDetails} from "../../../../../../api/feedDetails/queries";
import {CheckedIndicator} from "../../../../../FeedDetails/CheckedIndicator/CheckedIndicator";

import css from "./FeedDetailsList.scss";
import {SearchField} from "../../../../../../common/components/SearchField/SearchField";

interface FeedDetailsListProps {
    onAddNewFeedDetails: (item: FeedItemDetails) => void;
    onCreateNewFeedDetailsPopupOpen: () => void;
}

export const FeedDetailsList = ({onAddNewFeedDetails,
                                 onCreateNewFeedDetailsPopupOpen}: FeedDetailsListProps): React.ReactElement => {
    const {
        loading,
        error,
        availableFeedDetails,
        onAddNewFeedDetailsItemClick,
        isFeedsDetailsListOpened,
        onSearch,
        currentData,
        intl,
    } = useFeedDetailsList();

    if (loading) {
        return <div className={css.AddNewFeedDetailsItemBlock}>
            <CircularProgress size={16} disableShrink />
        </div>
    }

    if (error) {
        return <ErrorMessage showError={Boolean(error)} errorMessage={error.message}/>
    }

    return <>
        <div className={css.AddNewFeedDetailsItemBlock}>
            <IconButton onClick={onAddNewFeedDetailsItemClick}>
                {isFeedsDetailsListOpened ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            <IconButton onClick={onCreateNewFeedDetailsPopupOpen}>
                <AddIcon />
            </IconButton>
        </div>

        {isFeedsDetailsListOpened && availableFeedDetails && <div className={css.ListWithSearch}>
            <SearchField className={css.SearchFieldWrapper}
                         onChange={onSearch}
                         id='FeedDetailsSearch'
                         placeholder={intl.formatMessage({id: "Fields.Search"})}/>
            <List className={css.FeedDetailsAvailableList}>
                {currentData?.map((item) => (
                    <ListItem id={item.key} button onClick={() => onAddNewFeedDetails(item)} key={item.key}>
                        {item.type !== "checkedValue" ?
                            <ListItemText primary={item.name} secondary={`${item.amount} ${item.amountOfWhat}`} /> :
                            <>
                                <ListItemText primary={item.name} />
                                <CheckedIndicator type={item.type} wasGiven={item.wasGiven}/>
                            </>
                        }
                    </ListItem>
                ))}
            </List>
        </div>}
    </>
}