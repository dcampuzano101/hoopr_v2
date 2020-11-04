import React, { useEffect, useState } from "react";
import { listRuns } from "../actions/runActions";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import avatar from "../assets/user-avatar.png";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  CircularProgress,
  Button,
  Paper,
  Grid,
  Avatar,
  TableRow,
  TableHead,
  Table,
  TableBody,
  TableCell,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Map from "./Map";
import { addToCart } from "../actions/cartActions";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "20%",
    flexShrink: 0,
    textAlign: "center",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  submit: {
    width: "35%",
    height: "10%",
    display: "flex",
    margin: "0 auto",
  },
  userList: {
    display: "flex",
    width: "90%",
    margin: "0 5% 0 5%",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  userTable: {
    margin: "0 5% 2%",
    maxWidth: "90%",
  },
}));

const location = {
  address: "100 Dobbin St, Brooklyn, NY 11222",
  lat: 40.7251474,
  lng: -73.9566612,
};

const RunList = ({ history, location }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [successfulCheckout, setSuccessfulCheckout] = useState(null);

  useEffect(() => {
    dispatch(listRuns());

    if (location.search.split("=")[1] === "success") {
      console.log("inside location.search");
      setSuccessfulCheckout(`Successfully made purchase!`);
      location.search = "";
    }
  }, [dispatch]);

  const runsList = useSelector((state) => state.runList);
  const { loading, error, runs } = runsList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const parseDate = (date) => {
    let dateObj = new Date(date);
    const months = {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November",
      11: "December",
    };

    const days = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
    };

    let month = months[dateObj.getMonth()];
    let day = days[dateObj.getDay()];
    let numericalDay = date.split("-")[1];
    return `${day}, ${month} ${numericalDay}`;
  };

  const addToCartHandler = async (runId) => {
    try {
      dispatch(addToCart(runId));
      history.push(`/cart/${runId}?`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.root}>
      {error && <Alert severity="error">{error}</Alert>}
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Paper>
            {successfulCheckout ? (
              <Alert
                severity="success"
                onClose={() => {
                  setSuccessfulCheckout(null);
                }}
              >
                {successfulCheckout}
              </Alert>
            ) : null}
            <Accordion disabled>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography className={classes.heading}>DATE</Typography>
                <Typography className={classes.heading}>LOCATION</Typography>
                <Typography className={classes.heading}>TIME</Typography>
                <Typography className={classes.heading}>PRICE</Typography>
                <Typography className={classes.heading}>SPOTS</Typography>
              </AccordionSummary>
            </Accordion>
            {runs.map((run) => (
              <React.Fragment key={run._id}>
                <Accordion
                  expanded={expanded === run._id}
                  onChange={handleChange(run._id)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography className={classes.heading}>
                      {parseDate(run.date)}
                    </Typography>
                    <Typography className={classes.heading}>
                      {run.location}
                    </Typography>
                    <Typography className={classes.heading}>
                      {`${run.startTime} - ${run.endTime}`}
                    </Typography>
                    <Typography className={classes.heading}>
                      ${run.price}
                    </Typography>
                    <Typography className={classes.heading}>
                      {`${run.users.length}/${run.capacity}`}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container>
                      <Grid item xs={12} md={7} lg={7}>
                        <Map
                          location={run.geoLocation}
                          zoomLevel={15}
                          name={run.location}
                        />
                      </Grid>
                      <Grid item xs={12} md={5} lg={5}>
                        {run.users.length > 0 ? (
                          <>
                            <Table className={classes.userTable}>
                              <TableHead>
                                <TableRow colSpan={2}>
                                  <TableCell align="right">
                                    {run.users.length} Players
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                            </Table>

                            <div className={classes.userList}>
                              {run.users.map((user) => (
                                <>
                                  <div>
                                    {user.profilePhoto ? (
                                      <Avatar
                                        alt={user.username}
                                        src={user.profilePhoto}
                                      />
                                    ) : (
                                      <Avatar
                                        alt={user.username}
                                        src={avatar}
                                      />
                                    )}
                                  </div>
                                  <div>
                                    <Typography className={classes.heading}>
                                      {user.username}
                                    </Typography>
                                  </div>
                                </>
                              ))}
                            </div>
                          </>
                        ) : (
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  <Typography className={classes.heading}>
                                    No players yet!
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                          </Table>
                        )}

                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          onClick={() => addToCartHandler(run._id)}
                          disabled={run.users.some(
                            (user) => user.userId === userInfo._id
                          )}
                        >
                          ADD TO CART
                        </Button>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </React.Fragment>
            ))}
          </Paper>
        </>
      )}
    </div>
  );
};

export default withRouter(RunList);
