import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { listUsers } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

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
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

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
}));

const AdminUsers = () => {
  const classes = useStyles();

  const [usersError, setUsersError] = useState(null);
  const userList = useSelector((state) => state.userList);
  const { users, error, loading } = userList;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!users) {
      dispatch(listUsers());
    }
  }, [dispatch]);
  console.log(users);
  return (
    <>
      {loading ? (
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
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>username</TableCell>
                  <TableCell>email</TableCell>
                  <TableCell>isAdmin</TableCell>

                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </Paper>
        </>
      )}
    </>
  );
};

export default AdminUsers;
