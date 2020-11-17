import React, { useEffect, useState } from "react";
import { listRuns } from "../actions/runActions";
import { listUsers } from "../actions/userActions";
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
  TableCell,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Map from "./Map";
import { addToCart } from "../actions/cartActions";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: { marginBottom: "3%" },
  heading: {
    fontSize: theme.typography.pxToRem(22),
    letterSpacing: "1.3px",
    flexBasis: "20%",
    flexShrink: 0,
    color: "#fff",
    fontFamily: "Lilita One",
  },
  subHeading: {
    fontFamily: "Open Sans, Helvetica, Arial, sans-serif",
    fontSize: theme.typography.pxToRem(16),
    fontStyle: "normal",
    fontWeight: "normal",
    flexBasis: "20%",
    flexShrink: 0,
    textTransform: "none",
    color: "#34495E",
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
    margin: "1% 5% 1% 5%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  userTable: {
    margin: "0 5% 2%",
    maxWidth: "90%",
  },
}));

const RunList = ({ history, location }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [successfulCheckout, setSuccessfulCheckout] = useState(null);

  useEffect(() => {
    dispatch(listRuns());
    dispatch(listUsers());
    if (location.search.split("=")[1] === "success") {
      console.log("inside location.search");
      setSuccessfulCheckout(`Successfully made purchase!`);
      location.search = "";
    }
  }, [dispatch, location]);

  const userList = useSelector((state) => state.userList);
  const { users, loading: loadingUsers } = userList;

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

  const displayUsersForRun = (userIds) => {
    const result = [];
    userIds.forEach((id) => {
      result.push(users[id]);
    });
    return (
      <>
        <Table className={classes.userTable}>
          <TableHead>
            <TableRow colSpan={2}>
              <TableCell align="right">{result.length} Players</TableCell>
            </TableRow>
          </TableHead>
        </Table>

        <div className={classes.userList}>
          {result.map((user) => (
            <React.Fragment key={user._id}>
              {user.profilePhoto ? (
                <Avatar alt={user.username} src={user.profilePhoto} />
              ) : (
                <Avatar alt={user.username} src={avatar} />
              )}
              <Typography className={classes.subHeading}>
                {user.username}
              </Typography>
            </React.Fragment>
          ))}
        </div>
      </>
    );
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
                style={{ backgroundColor: "#819ca9" }}
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
                  styles={{ backgroundColor: "#eee" }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography className={classes.subHeading}>
                      {parseDate(run.date)}
                    </Typography>
                    <Typography className={classes.subHeading}>
                      {run.location}
                    </Typography>
                    <Typography className={classes.subHeading}>
                      {`${run.startTime} - ${run.endTime}`}
                    </Typography>
                    <Typography className={classes.subHeading}>
                      ${run.price}
                    </Typography>
                    <Typography className={classes.subHeading}>
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
                        {run.users.length > 0 && !loadingUsers ? (
                          displayUsersForRun(run.users)
                        ) : (
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  <Typography className={classes.subHeading}>
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
                          disabled={
                            userInfo
                              ? run.users.some((id) => id === userInfo._id)
                                ? true
                                : false
                              : false
                          }
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

/*
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
                                    <Typography className={classes.subHeading}>
                                      {user.username}
                                    </Typography>
                                  </div>
                                </>
                              ))}
                            </div>
                          </>


*/
