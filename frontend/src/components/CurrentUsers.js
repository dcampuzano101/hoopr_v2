import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRun } from "../actions/runActions";
import {
  makeStyles,
  TableRow,
  TableCell,
  Avatar,
  Typography,
  Button,
  IconButton,
  Grid,
  Table,
  Paper,
  TableHead,
  TableBody,
} from "@material-ui/core";
import avatar from "../assets/user-avatar.png";
import { Delete } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import Modal from "./Modal";

import { openModal, closeModal } from "../actions/modalActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    width: "100%",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  userList: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  alertMessage: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    justifySelf: "center",
  },
  alertIcon: {
    display: "flex",
    alignItems: "center",
  },
}));

const CurrentUsers = ({
  run,
  allUsers,
  deleteAlert,
  setDeleteAlert,
  users,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const deleteUserHandler = (userId) => {
    let usersClone = [...users];
    usersClone = usersClone.filter((user) => user !== userId);
    dispatch(updateRun({ id: run._id, users: usersClone }));
  };

  const modal = useSelector((state) => state.modal);
  const { isActive } = modal;
  const [removeUserId, setRemoveUserId] = useState(null);

  const deleteModalHandler = (userId) => {
    setRemoveUserId(userId);
    dispatch(openModal());
  };

  const displayUsers = () => {
    const result = [];
    run.users.forEach((id) => {
      result.push(allUsers[id]);
    });
    return (
      <>
        {isActive && (
          <>
            <p>modal</p>
            <button onClick={() => dispatch(closeModal())}>close</button>
          </>
        )}
        {removeUserId !== null && isActive && (
          <Modal
            type="delete"
            id={removeUserId}
            onConfirm={deleteUserHandler}
            heading="Permanently Delete User"
          />
        )}
        {result.map((user) => (
          <React.Fragment key={user._id}>
            <TableRow style={{ height: "5%" }}>
              <TableCell>
                <div className={classes.userList}>
                  {user.profilePhoto ? (
                    <Avatar alt={user.username} src={user.profilePhoto} />
                  ) : (
                    <Avatar alt={user.username} src={avatar} />
                  )}
                  <Typography
                    className={classes.subHeading}
                    style={{ marginLeft: "5%" }}
                  >
                    {user.username}
                  </Typography>
                </div>
              </TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteModalHandler(user._id)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow style={{ height: "5%" }}>
              {deleteAlert === user._id ? (
                <TableCell colSpan={15}>
                  <Alert
                    severity="warning"
                    classes={{
                      message: classes.alertMessage,
                      icon: classes.alertIcon,
                    }}
                    onClose={() => {
                      setDeleteAlert(null);
                    }}
                  >
                    Are you sure?
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={() => {
                        deleteUserHandler(user._id);
                        setDeleteAlert(null);
                      }}
                      startIcon={<Delete />}
                    >
                      Delete
                    </Button>
                  </Alert>
                </TableCell>
              ) : null}
            </TableRow>
          </React.Fragment>
        ))}
      </>
    );
  };
  return (
    <>
      <Paper className={classes.paper}>
        <Grid item xs={12} md={12} lg={12} style={{ maxHeight: "50px" }}>
          <Table size="small">
            <TableHead>
              <TableCell>Current Users</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableHead>
            <TableBody>
              {run && run.users && run.users.length > 0 ? displayUsers() : null}
            </TableBody>
          </Table>
        </Grid>
      </Paper>
    </>
  );
};

export default CurrentUsers;
