import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRunDetails, updateRun } from "../actions/runActions";
import { listUsers } from "../actions/userActions";
import EditForm from "../components/EditForm";
import CurrentUsers from "../components/CurrentUsers";
import AddUsers from "../components/AddUsers";

import Alert from "@material-ui/lab/Alert";

import {
  Typography,
  makeStyles,
  CircularProgress,
  Grid,
  Container,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
  usersContainer: {
    display: "flex",
    height: "auto",
  },
}));

const RunEditScreen = ({ history, match }) => {
  const runId = match.params.id;

  const runDetails = useSelector((state) => state.runDetails);
  const {
    error,
    run,
    success: successDetails,
    loading: loadingRun,
  } = runDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { users: allUsers, loading: loadingUsers } = userList;
  const [deleteAlert, setDeleteAlert] = useState(null);
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
  const [detailsError, setDetailsError] = useState(null);
  const [runUpdateSuccess, setRunUpdateSuccess] = useState(null);

  const classes = useStyles();
  const dispatch = useDispatch();

  const runUpdate = useSelector((state) => state.runUpdate);
  const { success, run: updatedRun } = runUpdate;

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
                success={success}
              />
            )}
          </Grid>
          {loadingRun ? (
            <CircularProgress />
          ) : (
            <AddUsers
              allUsers={allUsers}
              run={run}
              loadingUsers={loadingUsers}
              success={success}
            />
          )}

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
      </Container>
    </React.Fragment>
  );
};

export default RunEditScreen;
