import { ChevronLeft } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { bool, func } from "prop-types";
import React, { useEffect, useState } from "react";
import MainListItems from "./listItems";

const drawerWidth = 240;

function SideBarPay({ openDrawer, handleDrawerClose }) {
    const [interOpenDrawer, setInterOpenDrawer] = useState(openDrawer);

    useEffect(() => {
        setInterOpenDrawer(openDrawer);
    }, [openDrawer]);

    const toggleDrawer = (event) => {

        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }

        setInterOpenDrawer(false);
        handleDrawerClose(false);
    };

    return (
        <div>
            <Drawer anchor="left" open={interOpenDrawer} onClose={toggleDrawer}>
                <div id="toolbar" >
                    <IconButton onClick={toggleDrawer} size="large">
                        <ChevronLeft />
                    </IconButton>
                </div>
                <Divider />
                <div onClick={toggleDrawer}>
                    <List>
                        <MainListItems />
                    </List>
                </div>
            </Drawer>
        </div>
    );
}

SideBarPay.propTypes = {
    openDrawer: bool.isRequired,
    handleDrawerClose: func.isRequired,
};

export default SideBarPay;
