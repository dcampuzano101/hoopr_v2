import React from "react";
import avatar from "../assets/user-avatar.png";
import hooprLogo from "../assets/hoopr_logo.png";
import bannerImg from "../assets/bball-header.jpg";

import {
  Container,
  Paper,
  Grid,
  CssBaseline,
  makeStyles,
  Typography,
  Card,
  CardMedia,
} from "@material-ui/core";

const useStyles = makeStyles({
  bannerTextContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
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
});

const Banner = () => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12} md={5} lg={5}></Grid>
      <Grid item xs={12} md={7} lg={7} className={classes.bannerTextContainer}>
        <h1 className="bannerShadow">HOOPR</h1>
        <Typography variant="h5" gutterBottom>
          Pickup basketball in a flash.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Find a run near you, sign up & get ready!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Lace up your kicks, break a sweat, stay safe, and play ball.
        </Typography>
      </Grid>
    </>
  );
};

export default Banner;
