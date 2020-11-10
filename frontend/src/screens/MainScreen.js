import React from "react";
import RunList from "../components/RunList";
import Banner from "../components/Banner";
import Onboard from "../components/Onboard";

import {
  Container,
  Grid,
  makeStyles,
  Paper,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  bannerContainer: {
    marginTop: "2%",
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    height: "35%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    marginBottom: "12%",
    marginTop: "1%",
    height: "20vh",
  },
}));

const MainScreen = () => {
  // const theme = useTheme();
  const classes = useStyles();
  return (
    <>
      <Container>
        {/* <Grid
          container
          item
          xs={12}
          md={12}
          lg={12}
          className={classes.bannerContainer}
        > */}
        <Paper className={classes.paper}>
          <Banner />
          {/* <Onboard /> */}
        </Paper>
        {/* </Grid> */}
        <Grid item xs={12} md={12} lg={12}>
          <RunList />
        </Grid>
      </Container>
    </>
  );
};

export default MainScreen;
