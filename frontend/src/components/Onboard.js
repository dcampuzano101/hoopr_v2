import React from "react";
import { Paper, Grid, Container, makeStyles } from "@material-ui/core";

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
}));
const Onboard = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container xs={12} md={12} lg={12}>
        <Grid item xs={12} md={4} lg={4} className={classes.gridItem}>
          <Paper elevation={3} className={classes.paperCard}>
            STEP 1
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4} className={classes.gridItem}>
          <Paper elevation={3} className={classes.paperCard}>
            STEP 2
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4} className={classes.gridItem}>
          <Paper elevation={3} className={classes.paperCard}>
            STEP 3
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Onboard;
