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

export const AvatarBlock = () => {
    const anchorRef = React.useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    }

    const handleToggle = () => {
        setIsOpen(!isOpen);
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
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: 'bottom left' }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList className={css.Menu}
                                      autoFocusItem={isOpen} id="menu-list-grow">
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    </div>
}