//import clsx from 'clsx';
import React from "react";
import { ContainerApp } from "./css/LayoutPay-styled.css";
import FooterPay from "./FooterPay";
import { Outlet } from "react-router";

function LayoutPublic() {
  return (
    <>
      <ContainerApp maxWidth="lg" sx={{ bgcolor: "background.paper" }}>
        <main>
          <Outlet />
        </main>
        <FooterPay />
      </ContainerApp>
    </>
  );
}

export default LayoutPublic;
