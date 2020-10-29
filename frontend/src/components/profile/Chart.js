import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Deposits from "./Deposits";
import Runs from "./Runs";
import avatar from "../../assets/user-avatar.png";

import {
  Avatar,
  Button,
  CircularProgress,
  CssBaseline,
  TextField,
  Link,
  // Grid,
  Typography,
  //   Container,
  //   makeStyles,
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
}));

export default function Chart() {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(login(email, password));
  };

  return (
    <React.Fragment>
      <Title>Username's Profile</Title>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={6} lg={6} style={{ display: "flex" }}>
            <Paper className={classes.paper}>
              <img
                src={avatar}
                alt="avatar"
                srcset=""
                style={{ width: "100%", marginBottom: "2.1rem" }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                CHANGE PHOTO
              </Button>
              <Button
                type="submit"
                disabled
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                SAVE PHOTO
              </Button>
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={6} lg={6} style={{ display: "flex" }}>
            <Paper className={classes.paper}>
              <form
                className={classes.form}
                noValidate
                onSubmit={submitHandler}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {/* CONFIRMPASSWORD */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  UPDATE PROFILE
                </Button>
              </form>
            </Paper>
          </Grid>
          {/* Recent Runs  */}
          <Grid item xs={12}>
            <Paper className={classes.paper}></Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
