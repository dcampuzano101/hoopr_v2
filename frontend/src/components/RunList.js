import React, { useEffect, useState } from "react";
import { listRuns } from "../actions/runActions";
import { listUsers } from "../actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
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
}));

const RunList = ({ history, location }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [successfulCheckout, setSuccessfulCheckout] = useState(null);

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
  useEffect(() => {
    dispatch(listUsers());
    dispatch(listRuns());
    if (location.search.split("=")[1] === "success") {
      setSuccessfulCheckout(`Successfully made purchase!`);
      location.search = "";
    }
  }, [dispatch, location]);

  const displayUsersForRun = (userIds) => {
    const result = [];
    userIds.forEach((id) => {
      result.push(users[id]);
    });
    return (
      <>
        <Table size="small" className={classes.userTable}>
          <TableHead>
            <TableRow colSpan={2}>
              <TableCell align="right">{result.length} Players</TableCell>
            </TableRow>
          </TableHead>

          {result.map((user) => (
            <React.Fragment key={user._id}>
              <TableRow style={{ height: "5%" }}>
                <TableCell>
                  <div className={classes.userList}>
                    {user.profilePhoto ? (
                      <Avatar alt={user.username} src={user.profilePhoto} />
                    ) : (
                      <Avatar alt={user.username} src={avatar} />
                    )}
                    <Typography
                      className={classes.subHeading}
                      style={{ marginLeft: "5%" }}
                    >
                      {user.username}
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </Table>
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
                        {run.users.length > 0 && !loadingUsers && users ? (
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
