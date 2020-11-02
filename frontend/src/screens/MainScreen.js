import React from "react";
import RunList from "../components/RunList";
import Banner from "../components/Banner";

import { Container, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  bannerContainer: {
    marginTop: "2%",
  },
});

const MainScreen = () => {
  const classes = useStyles();
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid
            container
            item
            xs={12}
            md={12}
            lg={12}
            className={classes.bannerContainer}
          >
            <Banner />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <RunList />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MainScreen;
