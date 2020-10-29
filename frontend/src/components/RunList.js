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
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Map from "./Map";

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
}));

const location = {
  address: "100 Dobbin St, Brooklyn, NY 11222",
  lat: 40.7251474,
  lng: -73.9566612,
};

const RunList = () => {
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
                </AccordionDetails>
              </Accordion>
            </React.Fragment>
          ))}

          {/* <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>
                {parseDate(runs[0].date)}
              </Typography>
              <Typography className={classes.heading}>
                {runs[0].location}
              </Typography>
              <Typography className={classes.heading}>
                {`${runs[0].startTime} - ${runs[0].endTime}`}
              </Typography>
              <Typography className={classes.heading}>
                ${runs[0].price}
              </Typography>
              <Typography className={classes.heading}>
                {`${runs[0].users.length}/${runs[0].capacity}`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                feugiat. Aliquam eget maximus est, id dignissim quam.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography className={classes.heading}>Users</Typography>
              <Typography className={classes.secondaryHeading}>
                You are currently not an owner
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Donec placerat, lectus sed mattis semper, neque lectus feugiat
                lectus, varius pulvinar diam eros in elit. Pellentesque
                convallis laoreet laoreet.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography className={classes.heading}>
                Advanced settings
              </Typography>
              <Typography className={classes.secondaryHeading}>
                Filtering has been entirely disabled for whole web server
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                Integer sit amet egestas eros, vitae egestas augue. Duis vel est
                augue.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography className={classes.heading}>Personal data</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                Integer sit amet egestas eros, vitae egestas augue. Duis vel est
                augue.
              </Typography>
            </AccordionDetails>
          </Accordion> */}
        </>
      )}
    </div>
  );
};

export default RunList;
