import React, { useEffect, useState } from "react";
import { listRuns } from "../actions/runActions";
import { listUsers } from "../actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { updateRun } from "../actions/runActions";
import { updateUser } from "../actions/userActions";
import Alert from "@material-ui/lab/Alert";
import avatar from "../assets/user-avatar.png";
import moment from "moment";
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
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Map from "./Map";
import { addToCart } from "../actions/cartActions";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: { marginBottom: "3%" },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    letterSpacing: "1.3px",
    flexBasis: "20%",
    flexShrink: 0,
    color: "#fff",
    fontFamily: "Lilita One",
  },
  subHeading: {
    fontFamily: "Open Sans, Helvetica, Arial, sans-serif",
    fontSize: theme.typography.pxToRem(12),
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
    height: "1.5rem",
    display: "flex",
    margin: "0 auto",
  },
  userTable: {
    margin: "0 5% 2%",
    maxWidth: "90%",
  },
  tableHeader: {
    backgroundColor: theme.palette.primary.main,
    opacity: ".93",
    "& path": {
      display: "none",
    },
  },
  alertIcon: {
    display: "none",
  },
  userListContainer: {
    display: "grid",
    height: "30vh",
    gridTemplate: "auto 1fr auto / auto 1fr auto",
  },
  userListHeader: {
    padding: ".5rem 2rem",
    gridColumn: "1 / 4",
  },
  userListFooter: {
    textAlign: "center",
    height: "2vh",
    gridColumn: "1 / 4",
    display: "flex",
    alignItems: "center",
  },
  userList: {
    display: "grid",
    height: "21vh",
    gridGap: ".5rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
  },
  userContainer: {
    display: "flex",
    alignItems: "center",
  },
  leftSidebar: {
    gridColumn: "1/2",
    padding: "1rem",
  },
  rightSidebar: {
    gridColumn: "3/4",
    padding: "1rem",
  },
}));

const RunList = ({ history, location }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [successfulCheckout, setSuccessfulCheckout] = useState(null);

  const userList = useSelector((state) => state.userList);
  const { users, loading: loadingUsers } = userList;

  const runsList = useSelector((state) => state.runList);
  const { loading, error, runs } = runsList;

  // const runsList = useSelector((state) => state.runList);
  // const { loading, error, runs } = runsList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const runUpdate = useSelector((state) => state.runUpdate);
  const { success, run: updatedRun } = runUpdate;

  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    dispatch(listUsers());
    dispatch(listRuns());
    if (location.search.split("=")[1] === "success") {
      setSuccessfulCheckout(`Successfully made purchase!`);
      location.search = "";
    }

    // if (success) {
    //   setRunUpdateSuccess("Successfully updated run!");
    // }
  }, [dispatch, location, success]);

  const disableButton = (run, userInfo) => {
    if (userInfo === null) {
      return false;
    }
    return run.users.some((id) => id === userInfo._id) ||
      run.waitList.some((id) => id === userInfo._id)
      ? true
      : false;
  };

  const buttonToDisplay = (run, userInfo) => {
    if (userInfo !== null) {
      if (
        run.users.some((id) => id === userInfo._id) ||
        run.waitList.some((id) => id === userInfo._id)
      ) {
        return (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => cancelRunHandler(run, userInfo)}
            // disabled={disableButton(run, userInfo)}
          >
            Cancel
          </Button>
        );
      } else if (
        run.capacity === run.users.length &&
        run.waitList.length === 3
      ) {
        return (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled="true"
            className={classes.submit}
          >
            FULL!
          </Button>
        );
      } else if (
        run.capacity === run.users.length &&
        run.waitList.length !== 3
      ) {
        return (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => waitListHandler(run, userInfo)}
            disabled={disableButton(run, userInfo)}
          >
            JOIN WAITLIST
          </Button>
        );
      } else {
        return (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => addToCartHandler(run._id)}
            disabled={disableButton(run, userInfo)}
          >
            ADD TO CART
          </Button>
        );
      }
    } else {
      return (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => addToCartHandler(run._id)}
          disabled={disableButton(run, userInfo)}
        >
          ADD TO CART
        </Button>
      );
    }
  };

  const displayUsersForRun = (userIds, run) => {
    const result = [];
    userIds.forEach((id) => {
      result.push(users[id]);
    });
    return (
      <div className={classes.userListContainer}>
        <header className={classes.userListHeader}>
          <Typography>{result.length} Players</Typography>
        </header>
        <div className={classes.leftSidebar}></div>
        <main className={classes.userList}>
          {result.map((user) => (
            <React.Fragment key={user._id}>
              <div className={classes.userContainer}>
                {user.profilePhoto ? (
                  <Avatar
                    alt={user.username}
                    src={user.profilePhoto}
                    style={{ height: "30px", width: "30px" }}
                  />
                ) : (
                  <Avatar
                    alt={user.username}
                    src={avatar}
                    style={{ height: "30px", width: "30px" }}
                  />
                )}
                <Typography
                  className={classes.subHeading}
                  style={{ marginLeft: "5px", fontSize: ".7rem" }}
                >
                  {user.username}
                </Typography>
              </div>
            </React.Fragment>
          ))}
        </main>
        <div className={classes.rightSidebar}></div>

        <footer className={classes.userListFooter}>
          {buttonToDisplay(run, userInfo)}
        </footer>
      </div>
    );
  };

  const cancelRunHandler = (run, userInfo) => {
    console.log(run);
    console.log(userInfo);
  };
  const addToCartHandler = async (runId) => {
    try {
      dispatch(addToCart(runId));
      history.push(`/cart/${runId}?`);
    } catch (error) {
      console.log(error);
    }
  };
  const waitListHandler = (run, userInfo) => {
    const waitListCopy = [...run.waitList, userInfo._id];

    dispatch(
      updateRun({
        id: run._id,
        waitList: waitListCopy,
      })
    );
    dispatch(
      updateUser({
        id: userInfo._id,
        addToWaitList: true,
        runId: run._id,
      })
    );
  };
  console.log(runs);
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
                style={{ backgroundColor: "#546e7a", opacity: ".90" }}
                className={classes.tableHeader}
              >
                <Typography className={classes.heading}>DATE</Typography>
                <Typography className={classes.heading}>LOCATION</Typography>
                <Typography className={classes.heading}>TIME</Typography>
                <Typography className={classes.heading}>PRICE</Typography>
                <Typography className={classes.heading}>SPOTS</Typography>
              </AccordionSummary>
            </Accordion>
            {runs &&
              Object.values(runs).map((run) => (
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
                        {run.date}
                      </Typography>
                      <Typography className={classes.subHeading}>
                        {run.location}
                      </Typography>
                      <Typography className={classes.subHeading}>
                        {`${moment(run.startTime).format("LT")} - ${moment(
                          run.endTime
                        ).format("LT")}`}
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
                          {!loadingUsers &&
                            users &&
                            run &&
                            displayUsersForRun(run.users, run)}
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
