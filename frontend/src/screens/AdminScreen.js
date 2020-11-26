import React, { useEffect } from "react";
import AdminRuns from "../components/AdminRuns";
import AdminUsers from "../components/AdminUsers";
import { useSelector } from "react-redux";

import { Container, Grid, CssBaseline, makeStyles } from "@material-ui/core";

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
  }, [history, userInfo]);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} lg={12}>
            <AdminRuns />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <AdminUsers />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AdminScreen;
