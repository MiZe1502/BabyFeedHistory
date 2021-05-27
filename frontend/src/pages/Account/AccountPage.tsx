import React from "react";
import {useAccountPage} from "./useAccountPage";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import {ErrorMessage} from "../../common/components/ErrorMessage/ErrorMessage";
import Typography from "@material-ui/core/Typography";
import {AccountData} from "./components/AccountData/AccountData";

import css from "./AccountPage.scss";

export const AccountPage = (): React.ReactElement => {
    const {
        intl,
        loading,
        currentAccount,
        error
    } = useAccountPage();

    if (loading) {
        return <div className={css.AccountPage}>
            <CircularProgress size={54} disableShrink />
        </div>
    }

    let component = null;

    if (error) {
        component = <Card>
            <CardContent>
                <ErrorMessage showError={true} errorMessage={error?.message}/>
            </CardContent>
        </Card>
    } else if (currentAccount) {
        component = <AccountData accountData={currentAccount}/>;
    } else if (!currentAccount) {
        component = <Card className={css.FeedDetails}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {intl.formatMessage({id: "Messages.NoDataFound"})}
                </Typography>
            </CardContent>
        </Card>
    }

    return <div className={css.AccountPage}>
        {component}
    </div>
}