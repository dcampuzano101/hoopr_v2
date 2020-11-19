import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRun } from "../actions/runActions";
import MomentUtils from "@date-io/moment";
import {
  DatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

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

const RunCreateScreen = ({ history, match }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [name, setName] = useState("Name of Run");
  const [location, setLocation] = useState("Name of Location/Address");
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [capacity, setCapacity] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [alert, setAlert] = useState(null);
  const [users, setUsers] = useState(null);
  const [createRunBtnDisabled, setCreateRunBtnDisabled] = useState(true);
  const [detailsError, setDetailsError] = useState(null);
  const [runCreateSuccess, setRunCreateSuccess] = useState(null);

  const classes = useStyles();
  const dispatch = useDispatch();

  const runCreate = useSelector((state) => state.runCreate);
  const { success, run } = runCreate;

  const handleDateChange = (date, field) => {
    if (field === "date") {
      setDate(date);
    } else if (field === "start") {
      setStartTime(date);
    } else {
      setEndTime(date);
    }
    setCreateRunBtnDisabled(false);
  };

  const createRunHandler = (e) => {
    e.preventDefault();
    dispatch(
      createRun({
        name,
        location,
        date: moment(date, "MM-DD-YYYY").format("LL"),
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
      if (success) {
        setRunCreateSuccess("Successfully created run!");
        history.push("/admin");
      }
    }
  }, [history, userInfo, success]);
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
                  onSubmit={createRunHandler}
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="name"
                    placeholder="Name of run"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setCreateRunBtnDisabled(false);
                    }}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="location"
                    name="Name of Location/Address"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      setCreateRunBtnDisabled(false);
                    }}
                  />
                  <DatePicker
                    disablePast
                    label="Date"
                    value={date}
                    onChange={(date) => handleDateChange(date, "date")}
                    animateYearScrolling
                  />
                  <KeyboardTimePicker
                    label="Start Time"
                    // placeholder="08:00 AM"
                    // mask="__:__ _M"
                    value={startTime || ""}
                    onChange={(date) => handleDateChange(date, "start")}
                  />
                  <KeyboardTimePicker
                    label="End Time"
                    // placeholder="10:00 AM"
                    // mask="__:__ _M"
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
                      setCreateRunBtnDisabled(false);
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
                      setCreateRunBtnDisabled(false);
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={createRunBtnDisabled}
                  >
                    Create RUN
                  </Button>
                </form>
              </Paper>
            </Grid>
            {runCreateSuccess ? (
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Alert
                    severity="success"
                    onClose={() => {
                      setRunCreateSuccess(null);
                    }}
                  >
                    {runCreateSuccess}
                  </Alert>
                </Paper>
              </Grid>
            ) : null}
            {/* {detailsError ? (
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
            ) : null} */}
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

export default RunCreateScreen;
