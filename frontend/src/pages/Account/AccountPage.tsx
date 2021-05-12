import React from "react";
import css from "./AccountPage.scss";
import {useAccountPage} from "./useAccountPage";
import CircularProgress from "@material-ui/core/CircularProgress";

export const AccountPage = () => {
    const {
        intl,
        loading,
        currentAccount,
    } = useAccountPage();

    if (loading) {
        return <div className={css.AccountPage}>
            <CircularProgress size={54} disableShrink />
        </div>
    }

    let component = null;

    return <div className={css.AccountPage}>

    </div>
}