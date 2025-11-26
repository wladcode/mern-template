import React from "react";

import { Snackbar } from "@mui/material";

import Alert from "@mui/material/Alert";
import { clearMessages } from "../../../../redux/messageSlice";
import { useDispatch, useSelector } from "react-redux";

const DSMessage = () => {
  const messageData = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const closeSnackBarSucceFul = () => {
    dispatch(clearMessages());
  };

  const closeSnackBarError = () => {
    dispatch(clearMessages());
  };

  return (
    <>
      <Snackbar
        open={messageData.showSuccessMessage}
        autoHideDuration={4000}
        onClose={() => closeSnackBarSucceFul()}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => closeSnackBarSucceFul()} severity="success">
          {messageData.message}
        </Alert>
      </Snackbar>

      <Snackbar
        open={messageData.showErrorMessage}
        autoHideDuration={6000}
        onClose={() => closeSnackBarError()}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => closeSnackBarError()} severity="error">
          {messageData.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DSMessage;
