//import clsx from 'clsx';
import React, { useEffect, useState } from "react";
import { ContainerApp } from "./css/LayoutPay-styled.css";
import FooterPay from "./FooterPay";
import HeaderPay from "./HeaderPay";
import SideBarPay from "./SideBarPay";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const LayoutPay = () => {
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [navigate, currentUser]);

  ///const [userData, setUserData] = useState(props.user);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(!openDrawer);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(!openDrawer);
  };

  if (currentUser) {
    return (
      <>
        <HeaderPay
          openDrawer={openDrawer}
          handleDrawerOpen={handleDrawerOpen}
        />
        <SideBarPay
          openDrawer={openDrawer}
          handleDrawerClose={handleDrawerClose}
        />

        <ContainerApp maxWidth="lg" >
          <main>
            <Outlet />
          </main>
          <FooterPay />
        </ContainerApp>
      </>
    );
  }
  return <></>;
};

export default LayoutPay;
