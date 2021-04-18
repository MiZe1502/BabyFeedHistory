import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
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
    onClick?: () => void;
}

export const ButtonWithLoading = ({loading, className, loaderClassName,
       buttonClassName, locId, onClick}: ButtonWithLoadingProps): React.ReactElement => {
    let res;

    if (loading) {
        res = <CircularProgress className={loaderClassName} size={16} disableShrink />
    } else {
        res = <Button className={buttonClassName} onClick={onClick} type="submit" color="primary">
            <FormattedMessage id={locId} />
        </Button>
    }

    return <div className={cn(css.Wrapper, className)}>
        {res}
    </div>
}