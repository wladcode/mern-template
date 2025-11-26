import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { bool, func, node, string } from "prop-types";

const ResponsiveDialog = ({
  title = "Modal Title",
  handleAcceptModal = ()=>{},
  handleCloseModal= ()=>{},
  children,
  isFabButton = false,
  acceptButton = null,
  deleteButton = null,
  open,
  setOpen,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (handleCloseModal) {
      handleCloseModal();
    }
  };

  const handleAcceptAction = () => {
    setOpen(false);
    if (handleAcceptModal) {
      handleAcceptModal();
    }
  };

  const renderButton = () => {
    if (isFabButton) {
      return (
        <Fab
          style={{
            position: "fixed",
            bottom: 60,
            right: 30,
            textAlign: "center",
          }}
          size="small"
          color="primary"
          aria-label="add"
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Fab>
      );
    }

    return (
      <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button>
    );
  };

  const renderAcceptButton = () => {
    if (acceptButton) {
      return acceptButton;
    }

    return (
      <Button onClick={handleAcceptAction} autoFocus>
        Aceptar
      </Button>
    );
  };

  const renderDeleteButton = () => {
    if (deleteButton) {
      return deleteButton;
    }

    return null;
  };

  return (
    <React.Fragment>
      {renderButton()}

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          {renderDeleteButton()}
          {renderAcceptButton()}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

ResponsiveDialog.propTypes = {
  title: string,
  open: bool.isRequired,
  setOpen: func.isRequired,
  handleAcceptModal: func,
  handleCloseModal: func,
  children: node.isRequired,
  isFabButton: bool,
  acceptButton: node,
  deleteButton: node,
};

export default ResponsiveDialog;
