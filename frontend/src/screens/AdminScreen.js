import React, { useEffect } from "react";
import AdminRuns from "../components/AdminRuns";
import AdminUsers from "../components/AdminUsers";
import { useDispatch, useSelector } from "react-redux";

// import Container from "@material-ui/core/Container";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
// import makeStyles from "@material-ui/core/MakeStyles";

import {
  Container,
  Paper,
  Grid,
  CssBaseline,
  makeStyles,
  Typography,
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
    justifyContent: "center",
  },
  fixedHeight: {
    height: 240,
  },
}));

const AdminScreen = ({ history }) => {
  const classes = useStyles();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history]);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} lg={12}>
              <AdminUsers />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <AdminRuns />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default AdminScreen;
