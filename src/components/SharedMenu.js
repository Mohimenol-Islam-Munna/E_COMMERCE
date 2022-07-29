import React from "react";

// components
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/Divider";

const SharedMenu = ({
  items,
  open,
  anchorRef,
  handleClose,
  handleListKeyDown,
}) => {
  return (
    <>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  sx={{ p: "5px 10px" }}
                >
                  {items?.map((item, index) => (
                    <MenuItem
                      sx={{
                        "&::before, &::after": {
                          borderColor: "red",
                          display: "none",
                        },
                        p: "3px 15px",
                        textAlign: "center",
                      }}
                    >
                      {item}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default SharedMenu;
