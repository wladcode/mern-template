import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import * as React from "react";

function Copyright() {
  return (
    <>
      <Typography
        variant="body2"
        component="div"
        color="textSecondary"
        align="center"
      >
        {"Copyright © WladeCode " + new Date().getFullYear()}
      </Typography>
      <Typography
        variant="body2"
        component="div"
        color="textSecondary"
        align="center"
      >
        <Link
          color="inherit"
          href="https://wladecode.netlify.app/"
          target="_blank"
        >
          https://wladecode.netlify.app/
        </Link>
      </Typography>
    </>
  );
}

function FooterPay() {
  return (
    <footer>
      <Box
        sx={{
          py: 1,
          px: 1,
          
        }}
      >
        <Copyright />
      </Box>
    </footer>
  );
}

export default FooterPay;
