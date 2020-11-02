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
});

const Banner = () => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12} md={4} lg={4}>
        {/* <Card> */}
        <CardMedia
          component="img"
          alt="Hoopr Logo"
          height="340"
          image={hooprLogo}
          title="Hoopr Logo"
        ></CardMedia>
        {/* </Card> */}
      </Grid>
      <Grid item xs={12} md={8} lg={8} className={classes.bannerTextContainer}>
        <Typography variant="h5" gutterBottom>
          Pickup basketball in a flash.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Find a run near you, sign up & get ready!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Lace up your kicks, break a sweat, stay safe, and play ball.
        </Typography>
        {/* </Card> */}
      </Grid>
    </>
  );
};

export default Banner;
