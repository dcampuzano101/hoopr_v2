import React from "react";
import RunList from "../components/RunList";
import Banner from "../components/Banner";

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
}));

const MainScreen = () => {
  // const theme = useTheme();
  const classes = useStyles();
  return (
    <>
      <Container>
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
      </Container>
    </>
  );
};

export default MainScreen;
