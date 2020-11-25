import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, Button, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import MomentUtils from "@date-io/moment";

import {
  DatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    width: "100%",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const EditForm = ({
  run,
  date,
  setDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  location,
  setLocation,
  name,
  setName,
  price,
  setPrice,
  capacity,
  setCapacity,
  details,
  setDetails,
  setUpdateRunBtnDisabled,
}) => {
  const classes = useStyles();

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
  return (
    <>
      {" "}
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid item xs={12} md={4} lg={4} style={{ display: "flex" }}>
          <Paper className={classes.paper}>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="name"
                placeholder="name"
                name="name"
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
                name="location"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setUpdateRunBtnDisabled(false);
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
            </form>
          </Paper>
        </Grid>
      </MuiPickersUtilsProvider>
    </>
  );
};

export default EditForm;
