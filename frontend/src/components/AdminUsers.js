import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { listUsers } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../actions/userActions";
import { withRouter } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Grid,
  makeStyles,
  CircularProgress,
  IconButton,
  Button,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { Delete, Edit } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
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

const AdminUsers = ({ history }) => {
  const classes = useStyles();

  const [usersError, setUsersError] = useState(null);

  const [deleteAlert, setDeleteAlert] = useState(null);

  const userList = useSelector((state) => state.userList);
  const { users, error, loading } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  let {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, successDelete, errorDelete, loadingDelete]);

  const deleteUserHandler = (userId) => {
    dispatch(deleteUser(userId));
  };

  return (
    <>
      {loading || loadingDelete ? (
        <CircularProgress />
      ) : (
        <>
          <Typography>ALL USERS</Typography>
          <Paper className={classes.paper}>
            {error && (
              <Alert
                severity="error"
                onClose={() => {
                  setUsersError(null);
                }}
              >
                {error}
              </Alert>
            )}
            {errorDelete && (
              <Alert
                severity="error"
                onClose={() => {
                  setUsersError(null);
                }}
              >
                {errorDelete}
              </Alert>
            )}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3}>username</TableCell>
                  <TableCell colSpan={4}>email</TableCell>
                  <TableCell colSpan={2}>isAdmin</TableCell>
                  {/* possibly display # of runs */}
                  <TableCell colSpan={3} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.values(users).map((user) => (
                  <React.Fragment key={user._id}>
                    <TableRow>
                      <TableCell colSpan={3}>{user.username}</TableCell>
                      <TableCell colSpan={4}>{user.email}</TableCell>
                      <TableCell colSpan={2}>{`${user.isAdmin}`}</TableCell>
                      <TableCell colSpan={3} align="right">
                        {" "}
                        <IconButton
                          aria-label="edit"
                          onClick={() => {
                            history.push(`/users/${user._id}/edit`);
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => setDeleteAlert(user._id)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>

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
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </>
      )}
    </>
  );
};

export default withRouter(AdminUsers);
