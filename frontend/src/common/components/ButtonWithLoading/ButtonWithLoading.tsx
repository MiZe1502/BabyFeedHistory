import {Button, CircularProgress} from "@material-ui/core";
import {FormattedMessage} from "react-intl";
import cn from "classnames";
import React from "react";

import css from "./ButtonWithLoading.scss";

interface ButtonWithLoadingProps {
    loading: boolean;
    className?: string;
    buttonClassName?: string;
    loaderClassName?: string;
    locId: string;
}

export const ButtonWithLoading = ({loading, className, loaderClassName,
       buttonClassName, locId}: ButtonWithLoadingProps) => {
    let res;

    if (loading) {
        res = <CircularProgress className={loaderClassName} size={16} disableShrink />
    } else {
        res = <Button className={buttonClassName} type="submit" color="primary">
            <FormattedMessage id={locId} />
        </Button>
    }

    return <div className={cn(css.Wrapper, className)}>
        {res}
    </div>
}