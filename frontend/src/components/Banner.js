import React from "react";
import { useSpring, animated } from "react-spring";

import {
  Container,
  Paper,
  Grid,
  CssBaseline,
  makeStyles,
  Card,
} from "@material-ui/core";

const useStyles = makeStyles({
  bannerTextContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});

const config = { mass: 1, tension: 1000, friction: 100 };

const Banner = () => {
  const classes = useStyles();

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: "1200",
  });
  return (
    <>
      <Grid item xs={12} md={5} lg={5}></Grid>
      <Grid item xs={12} md={7} lg={7} className={classes.bannerTextContainer}>
        <animated.div style={props}>
          <h1 className="bannerShadow">HOOPR</h1>
        </animated.div>
      </Grid>
    </>
  );
};

export default Banner;

// bannerLogo: {
//   color: "#e1e2e1",
//   fontSize: "calc(1em + 10vw)",
//   fontWeight: "900",
//   fontFamily: "Lilita One",
//   textShadow: "-0.0075em 0.0075em 0 #e1e2e1",
//     "0.005em 0.005em 0 #e1e2e1",
//     "0.01em 0.01em 0 #e1e2e1",
//     "0.015em 0.015em #e1e2e1",
//     "0.02em 0.02em 0 #e1e2e1",
//     "0.025em 0.025em 0 #e1e2e1",
//     "0.03em 0.03em 0 #e1e2e1",
//     "0.035em 0.035em 0 #e1e2e1",
// },

{
  /* <Typography variant="h5" gutterBottom>
    Pickup basketball in a flash.
  </Typography>
  <Typography variant="subtitle1" gutterBottom>
    Find a run near you, sign up & get ready!
  </Typography>
  <Typography variant="body1" gutterBottom>
    Lace up your kicks, break a sweat, stay safe, and play ball.
  </Typography> */
}
