import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { openModal, closeModal } from "../actions/modalActions";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  modalDialogBox: {
    width: "400px",
    height: "auto",
    backgroundColor: "#edfdff",
    borderRadius: "5px",
    display: "flex",
    position: "absolute",
    zIndex: "1010",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
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
    display: "flex",
  },
  modalHeader: {
    display: "flex",
    alignSelf: "flex-end",
  },
}));

const Modal = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleClose = (e) => {
    e.preventDefault();
    dispatch(closeModal());
  };

  return (
    <div className={classes.modalOverlay} onClick={handleClose}>
      <div className={classes.modalDialogBox}>
        <div className={classes.modalHeader}>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        {props.Component}
      </div>
    </div>
  );
};

export default Modal;
