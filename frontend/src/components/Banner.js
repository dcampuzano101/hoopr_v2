import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import hooprLogo from "../assets/hoopr_logo.png";
import skyline from "../assets/skyline.svg";

const useStyles = makeStyles({
  bannerImg: {
    width: "100%",
    height: "40vh",
    backgroundImage: `url(${skyline})`,
    backgroundSize: "cover",
    opacity: "1",
    backgroundPosition: "right 3%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: "1.5",
  },
});

const Banner = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={12} lg={12} className={classes.bannerImg}>
      <img src={hooprLogo} style={{ height: "65%" }}></img>
    </Grid>
  );
};

export default Banner;
