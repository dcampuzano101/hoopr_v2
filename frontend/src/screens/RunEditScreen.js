import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRunDetails, updateRun } from "../actions/runActions";
import { listUsers } from "../actions/userActions";
import avatar from "../assets/user-avatar.png";
import EditForm from "../components/EditForm";
import CurrentUsers from "../components/CurrentUsers";

import { Delete } from "@material-ui/icons";

import Alert from "@material-ui/lab/Alert";

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
  CircularProgress,
  IconButton,
  Button,
  Grid,
  Container,
  Paper,
  Avatar,
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
    width: "100%", // Fix IE 11 issue.
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

const RunEditScreen = ({ history, match }) => {
  const runId = match.params.id;

  const runDetails = useSelector((state) => state.runDetails);
  const { error, run, success: successDetails } = runDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { users: allUsers, loading: loadingUsers } = userList;
  const [deleteAlert, setDeleteAlert] = useState(null);
  const [addUsers, setAddUsers] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [capacity, setCapacity] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [alert, setAlert] = useState(null);
  const [users, setUsers] = useState(null);
  const [updateRunBtnDisabled, setUpdateRunBtnDisabled] = useState(true);
  const [detailsError, setDetailsError] = useState(null);
  const [runUpdateSuccess, setRunUpdateSuccess] = useState(null);
  const [newUsers, setNewUsers] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [emptyRows, setEmptyRows] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const classes = useStyles();
  const dispatch = useDispatch();

  const runUpdate = useSelector((state) => state.runUpdate);
  const { success, run: updatedRun } = runUpdate;

  const displayAllUsers = () => {
    console.log(`hit again`);
    return (
      <>
        {Object.values(allUsers)
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((user) => (
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
                  <IconButton
                    aria-label="delete"
                    onClick={() => setDeleteAlert(user._id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
      </>
    );
  };

  const updateRunHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateRun({
        id: run._id,
        name,
        location,
        date,
        startTime,
        endTime,
        capacity,
        price,
        details,
        users,
      })
    );
  };

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push("/login");
    } else {
      if (!run || run._id !== runId) {
        dispatch(getRunDetails(runId));
        dispatch(listUsers());
      }

      if ((successDetails || success) && run) {
        setName(run.name);
        setLocation(run.location);
        setUsers(run.users);
        setDate(run.date);
        setStartTime(run.startTime);
        setEndTime(run.endTime);
        setCapacity(run.capacity);
        setPrice(run.price);
        setDetails(run.details);
      }

      if (error) {
        setDetailsError(error);
      }

      if (success) {
        setRunUpdateSuccess("Successfully updated run!");
      }
    }
  }, [
    dispatch,
    history,
    location,
    userInfo,
    runUpdate,
    success,
    error,
    successDetails,
    runId,
    updatedRun,
    run,
  ]);
  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <EditForm
            run={run}
            date={date}
            setDate={setDate}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            capacity={capacity}
            setCapacity={setCapacity}
            price={price}
            setPrice={setPrice}
            location={location}
            setLocation={setLocation}
            details={details}
            setDetails={setDetails}
            name={name}
            setName={setName}
            setUpdateRunBtnDisabled={setUpdateRunBtnDisabled}
            updateRunHandler={updateRunHandler}
          />
          <Grid
            item
            container
            xs={12}
            md={4}
            lg={4}
            className={classes.usersContainer}
          >
            {loadingUsers ? (
              <CircularProgress />
            ) : (
              <CurrentUsers
                run={run}
                allUsers={allUsers}
                deleteAlert={deleteAlert}
                setDeleteAlert={setDeleteAlert}
                users={users}
                setUsers={setUsers}
                updateRunHandler={updateRunHandler}
                success={success}
              />
            )}
          </Grid>
          <Grid item container xs={12} md={4} lg={4}>
            <Paper className={classes.paper}>
              <Grid item xs={12} md={12} lg={12}>
                {!addUsers && run && run.users && (
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
                )}
                {addUsers && (
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableCell>All Users</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableHead>
                      <TableBody>
                        {allUsers && !loadingUsers ? displayAllUsers() : null}
                        {/* {emptyRows > 0 && (
                            <TableRow style={{ height: "5px" * emptyRows }}>
                              <TableCell colSpan={6} />
                            </TableRow>
                          )} */}
                      </TableBody>
                    </Table>
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
                  </TableContainer>
                )}
              </Grid>
            </Paper>
          </Grid>
          {runUpdateSuccess ? (
            <Grid item xs={12} style={{ display: "flex" }}>
              <Paper className={classes.paper}>
                <Alert
                  severity="success"
                  onClose={() => {
                    setRunUpdateSuccess(null);
                  }}
                >
                  {runUpdateSuccess}
                </Alert>
              </Paper>
            </Grid>
          ) : null}
          {detailsError ? (
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Alert
                  severity="error"
                  onClose={() => {
                    setDetailsError(null);
                  }}
                >
                  {detailsError}
                </Alert>
              </Paper>
            </Grid>
          ) : null}
          {alert ? (
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Alert
                  severity="error"
                  onClose={() => {
                    setAlert(null);
                  }}
                >
                  {alert}
                </Alert>
              </Paper>
            </Grid>
          ) : null}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={updateRunBtnDisabled}
          onClick={updateRunHandler}
        >
          UPDATE RUN
        </Button>
      </Container>
    </React.Fragment>
  );
};

export default RunEditScreen;
