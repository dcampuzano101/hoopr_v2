import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modalDialogBox: {
    width: "400px",
    height: "400px",
    backgroundColor: "#00C6D9",
    borderRadius: "5px",
    display: "flex",
    position: "absolute",
    zIndex: "1010",
    alignItems: "center",
    justifyContent: "center",
  },
  modalOverlay: {
    zIndex: "1000",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(10, 10, 10, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Modal = () => {
  const classes = useStyles();

  return (
    <div className={classes.modalOverlay}>
      <p>modal</p>
    </div>
  );
};

export default Modal;
