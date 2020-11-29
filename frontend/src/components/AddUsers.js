import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateRun } from "../actions/runActions";

import avatar from "../assets/user-avatar.png";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
  Typography,
  makeStyles,
  Button,
  Grid,
  Paper,
  Avatar,
  Checkbox,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    width: "100%",
  },
  fixedHeight: {
    height: 240,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paperProfileCard: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between",
  },
  usersContainer: {
    display: "flex",
    height: "auto",
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
const AddUsers = ({ allUsers, run, loadingUsers, success }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [displayPagination, setDisplayPagination] = useState(true);
  const [addUsers, setAddUsers] = useState(false);
  const [page, setPage] = useState(0);
  const [newUsers, setNewUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [emptyRows, setEmptyRows] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCheck = (userId) => {
    let setCopy = new Set([...newUsers, ...run.users]);
    if (setCopy.has(userId)) {
      setCopy.delete(userId);
    } else {
      setCopy.add(userId);
    }
    setNewUsers([...setCopy]);
  };

  const handleRunUpdate = () => {
    dispatch(updateRun({ id: run._id, users: newUsers }));
  };

  const displayAllUsers = () => {
    let allUsersArray = Object.values(allUsers)
      .filter((user) => run.users.indexOf(user._id) === -1)
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    if (allUsersArray.length > 0) {
      return (
        <>
          {allUsersArray.map((user) => (
            <React.Fragment key={user._id}>
              <TableRow style={{ height: "5px" }}>
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
                  <Checkbox
                    checked={newUsers.indexOf(user._id) >= 0}
                    onChange={() => handleCheck(user._id)}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </>
      );
    } else {
      setDisplayPagination(false);
      return <Typography>No Users Available</Typography>;
    }
  };
  return (
    <>
      {" "}
      <Grid item container xs={12} md={4} lg={4}>
        <Paper className={classes.paper}>
          {!addUsers &&
          run &&
          allUsers &&
          run.users.length !== Object.values(allUsers).length ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={run.users.length === run.capacity}
              onClick={() => setAddUsers(true)}
            >
              Add Users
            </Button>
          ) : (
            <Typography>No Users Available To Add</Typography>
          )}
          {addUsers && allUsers && (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableCell>All Users</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableHead>
                <TableBody>
                  {allUsers && run && !loadingUsers ? displayAllUsers() : null}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: "5px" * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {displayPagination && (
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={Object.values(allUsers).length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  style={{ width: "100%" }}
                />
              )}
            </TableContainer>
          )}
          {newUsers && run && newUsers.length > 0 && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={newUsers.length === run.users.length}
              className={classes.submit}
              onClick={() => handleRunUpdate()}
            >
              Add Selected Users
            </Button>
          )}
        </Paper>
      </Grid>{" "}
    </>
  );
};

export default AddUsers;
