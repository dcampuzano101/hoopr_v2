import React from "react";
import { Paper, Grid, makeStyles } from "@material-ui/core";
import animatedDunk from "../assets/animated_dunk.gif";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    display: "flex",
    justifyContent: "center",
  },
  paperCard: {
    height: "12vh",
    width: "15vw",
    opacity: ".96",
  },
  imgCard: {
    height: "100%",
  },
}));
const Onboard = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={4} lg={4} className={classes.gridItem}>
          <Paper elevation={3} className={classes.paperCard}></Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4} className={classes.gridItem}>
          <Paper elevation={3} className={classes.paperCard}></Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4} className={classes.gridItem}>
          <Paper elevation={3} className={classes.paperCard}></Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Onboard;
