import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import React, {useState} from "react";

import css from "./AvatarBlock.scss"
import {Popper} from "@material-ui/core";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import {routes} from "../../../../utils/routes";
import {useAuth} from "../../../../common/hooks/useAuth";
import {useIntl} from "react-intl";

export const AvatarBlock = (): React.ReactElement => {
    const intl = useIntl();
    const anchorRef = React.useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const auth = useAuth();

    const history = useHistory();

    const handleClose = () => {
        setIsOpen(false);
    }

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    const logout = () => {
        setIsOpen(false);
        auth?.logout();
    }

    const goToAccountPage = () => {
        history.push(routes.account);
        setIsOpen(false);
    }

    return <div className={css.Wrapper}>
        <IconButton
            ref={anchorRef}
            aria-label="toggle password visibility"
            onClick={handleToggle}
        >
            <Avatar>
                <PersonIcon />
            </Avatar>
        </IconButton>
        <Popper open={isOpen} anchorEl={anchorRef.current}
                role={undefined} transition disablePortal>
            {({ TransitionProps }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: 'bottom left' }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList className={css.Menu}
                                      autoFocusItem={isOpen} id="menu-list-grow">
                                <MenuItem onClick={goToAccountPage}>
                                    {intl.formatMessage({id: "Menu.User.Profile"})}
                                </MenuItem>
                                <MenuItem onClick={logout}>
                                    {intl.formatMessage({id: "Menu.User.Logout"})}
                                </MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    </div>
}