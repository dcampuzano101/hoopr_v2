import React from "react";
import { useSpring, animated } from "react-spring";
import Onboard from "./Onboard";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  bannerTextContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    border: "1px solid black",
  },
  springDiv: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  cardGrid: {
    display: "flex",
    flexBasis: "33%",
  },
  cardContainer: {
    margin: "2% 0%",
  },
});

const Banner = () => {
  const classes = useStyles();

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: "1200",
  });
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={5} lg={5}>
          <animated.div style={props} className={classes.springDiv}>
            <h1 className="bannerShadow">HOOPR</h1>
          </animated.div>
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          lg={7}
          className={classes.bannerTextContainer}
        ></Grid>
        <Grid item xs={12} md={12} lg={12} className={classes.cardContainer}>
          <Onboard />
        </Grid>
      </Grid>
    </div>
  );
};

export default Banner;
