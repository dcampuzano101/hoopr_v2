import React from "react";
import RunList from "../components/RunList";
import Banner from "../components/Banner";

import { Container, Grid, makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  bannerContainer: {
    marginTop: "2%",
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    height: "35%",
  },
  paper: {
    // padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    marginBottom: "10%",
    // marginTop: "1%",
    height: "25vh",
  },
}));

const MainScreen = () => {
  const classes = useStyles();
  return (
    <>
      <Container>
        <Paper className={classes.paper}>
          <Banner />
        </Paper>
        <Grid item xs={12} md={12} lg={12}>
          <RunList />
        </Grid>
      </Container>
    </>
  );
};

export default MainScreen;
