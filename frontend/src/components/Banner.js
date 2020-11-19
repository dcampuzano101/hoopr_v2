import React from "react";
import { useSpring, animated } from "react-spring";
import Onboard from "./Onboard";
import { Grid, makeStyles } from "@material-ui/core";
import hooprLogo from "../assets/hoopr_logo.png";
import skyline from "../assets/skyline.svg";

const useStyles = makeStyles({
  bannerTextContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // border: "1px solid black",
    height: "100%",
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
  bannerImg: {
    width: "102%",
    height: "100%",
    backgroundImage: `url(${skyline})`,
    // backgroundSize: "cover",
    opacity: "1",
    position: "relative",
    backgroundPosition: "right 3%",
  },
});

const Banner = () => {
  const classes = useStyles();

  // const props = useSpring({
  //   opacity: 1,
  //   from: { opacity: 0 },
  //   delay: "1000",
  // });
  return (
    <Grid container className={classes.bannerImg}>
      <Grid item xs={12} md={12} lg={12} style={{ height: "100%" }}>
        <img src={hooprLogo}></img>
      </Grid>

      <Grid item xs={12} md={12} lg={12} className={classes.cardContainer}>
        <Onboard />
      </Grid>
    </Grid>
  );
};

export default Banner;
