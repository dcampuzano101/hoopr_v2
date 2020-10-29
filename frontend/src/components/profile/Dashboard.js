import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Runs from "./Runs";

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

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={classes.paper}>
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid
              item
              xs={12}
              md={6}
              lg={6}
              style={{ display: "flex", width: "100%" }}
            >
              <Paper className={classes.paper}>
                <Deposits />
              </Paper>
            </Grid>
            {/* Recent Runs */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Runs />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
