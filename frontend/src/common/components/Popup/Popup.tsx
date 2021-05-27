import React, {PropsWithChildren} from "react";
import Dialog from "@material-ui/core/Dialog";
import {Header} from "./components/Header/Header";

import css from "./Popup.scss";

interface PopupProps {
    onClose?: () => void;
    titleId?: string;
}

export const Popup = ({titleId,
                      onClose,
                      children}: PopupProps & PropsWithChildren<PopupProps>): React.ReactElement => {
    return <Dialog open={true}>
        <div className={css.PopupTitleWrapper}>
            <Header onClose={onClose} titleId={titleId}/>
        </div>
        {children}
    </Dialog>
}