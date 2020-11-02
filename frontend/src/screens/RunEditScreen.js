import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRunDetails, updateRun } from "../actions/runActions";
import MomentUtils from "@date-io/moment";
import {
  DatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";

import { Button, TextField } from "@material-ui/core";

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
  paperProfileCard: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between",
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
}));

const RunEditScreen = ({ history, match }) => {
  const runId = match.params.id;

  const runDetails = useSelector((state) => state.runDetails);
  const { error, run, success: successDetails } = runDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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

  const [] = useState(true);
  const [updateRunBtnDisabled, setUpdateRunBtnDisabled] = useState(true);
  const [detailsError, setDetailsError] = useState(null);
  const [runUpdateSuccess, setRunUpdateSuccess] = useState(null);

  const classes = useStyles();
  const dispatch = useDispatch();

  const runUpdate = useSelector((state) => state.runUpdate);
  const { success, run: updatedRun } = runUpdate;

  const handleDateChange = (date, field) => {
    if (field === "date") {
      setDate(date);
    } else if (field === "start") {
      setStartTime(date);
    } else {
      setEndTime(date);
    }
    setUpdateRunBtnDisabled(false);
  };

  const updateRunHandler = (e) => {
    e.preventDefault();
    //NEEDSWORK
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
      }

      if ((successDetails || success) && run) {
        console.log(`INSIDESUCCESSMOF`);
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
      //   if (success && run !== updatedRun) {
      //     dispatch(getRunDetails(runId));
      //   }
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
  ]);
  debugger;
  console.log(run);
  return (
    <React.Fragment>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6} style={{ display: "flex" }}>
              <Paper className={classes.paper}>
                <form
                  className={classes.form}
                  noValidate
                  onSubmit={updateRunHandler}
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="name"
                    // label="name"
                    placeholder="name"
                    name="name"
                    // autoComplete="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setUpdateRunBtnDisabled(false);
                    }}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="location"
                    label="Location"
                    name="location"
                    autoComplete="location"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      setUpdateRunBtnDisabled(false);
                    }}
                  />
                  <DatePicker
                    // key={date}
                    disablePast
                    label="Date"
                    value={date}
                    onChange={(date) => handleDateChange(date, "date")}
                    animateYearScrolling
                  />
                  <KeyboardTimePicker
                    // key={startTime}
                    label="Start Time"
                    placeholder="08:00 AM"
                    mask="__:__ _M"
                    value={startTime || ""}
                    onChange={(date) => handleDateChange(date, "start")}
                  />
                  <KeyboardTimePicker
                    // key={endTime}
                    label="End Time"
                    placeholder="10:00 AM"
                    mask="__:__ _M"
                    value={endTime || ""}
                    onChange={(date) => handleDateChange(date, "end")}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="capacity"
                    label="Capacity"
                    name="capacity"
                    autoComplete="capacity"
                    value={capacity}
                    onChange={(e) => {
                      setCapacity(e.target.value);
                      setUpdateRunBtnDisabled(false);
                    }}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="price"
                    label="price"
                    name="price"
                    autoComplete="price"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                      setUpdateRunBtnDisabled(false);
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={updateRunBtnDisabled}
                  >
                    UPDATE RUN
                  </Button>
                </form>
              </Paper>
            </Grid>
            {runUpdateSuccess ? (
              <Grid item xs={12}>
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
      </MuiPickersUtilsProvider>
    </React.Fragment>
  );
};

export default RunEditScreen;
