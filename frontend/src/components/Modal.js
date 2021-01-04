import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { openModal, closeModal } from "../actions/modalActions";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import { Button } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  modalDialogBox: {
    width: "35%",
    height: "50%",
    backgroundColor: "#edfdff",
    borderRadius: "5px",
    display: "flex",
    position: "absolute",
    zIndex: "2000",
    alignItems: "center",
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
  headerButtons: {
    display: "flex",
    alignSelf: "flex-end",
  },
  title: {
    fontFamily: "Lilita One",
    weight: 400,
    fontSize: "2rem",
    spacing: "2px",
    textTransform: "uppercase",
    opacity: 0.8,
    letterSpacing: "1",
    color: "#29434e",
  },
  bodyText: {
    // padding: "5%",
    color: "#29434e",
    fontSize: "1.125rem",
    fontFamily: "Lilita One",
    letterSpacing: "1.3px",
    textTransform: "uppercase",
  },
  footerButton: {},
  deleteWrapper: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "5%",
    height: "100%",
    marginBottom: "5%",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

//props.type === 'delete' ? props.id && props.onConfirm

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
        <div className={classes.headerButtons}>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        {props.type === "delete" ? (
          <div className={classes.deleteWrapper}>
            <div className={classes.title}>{props.heading}</div>
            <div className={classes.bodyText}>
              <h3>Are you sure? This action is irreversible.</h3>
            </div>
            <div className={classes.footerButton}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  props.onConfirm(props.id);
                }}
                startIcon={<Delete />}
              >
                Delete
              </Button>
            </div>
          </div>
        ) : (
          <>{props.Component}</>
        )}
      </div>
    </div>
  );
};

export default Modal;
