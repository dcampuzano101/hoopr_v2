import React, { useEffect } from "react";
import { listRuns } from "../actions/runActions";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  CircularProgress,
  Button,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Map from "./Map";
import { addToCart } from "../actions/cartActions";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    height: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "20%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  submit: {
    // margin: theme.spacing(3, 0, 2),
    width: "35%",
    height: "10%",
    display: "flex",
    margin: "0 auto",
  },
}));

const location = {
  address: "100 Dobbin St, Brooklyn, NY 11222",
  lat: 40.7251474,
  lng: -73.9566612,
};

const RunList = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listRuns());
  }, [dispatch]);

  const runsList = useSelector((state) => state.runList);
  const { loading, error, runs } = runsList;

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
                  <Map location={location} zoomLevel={13} name={run.location} />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    // value={run._id}
                    onClick={() => addToCartHandler(run._id)}
                    // disabled={updateProfileBtnDisabled}
                  >
                    ADD TO CART
                  </Button>
                </AccordionDetails>
              </Accordion>
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
};

export default withRouter(RunList);
