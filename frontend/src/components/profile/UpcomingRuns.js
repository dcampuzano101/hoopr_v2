import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  TableContainer,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(24),
    flexBasis: "20%",
    flexShrink: 0,
  },
}));

const UpcomingRuns = ({ location }) => {
  const userDetails = useSelector((state) => state.userDetails);
  const { user, success: successDetails, loading } = userDetails;
  const [myRuns, setMyRuns] = useState(null);
  const [waitList, setWaitList] = useState(null);
  const runList = useSelector((state) => state.runList);
  const { runs, loading: loadingRuns } = runList;
  const classes = useStyles();

  useEffect(() => {
    if (successDetails) {
      setMyRuns(user.runs);
      setWaitList(user.waitList);
    }
  }, [successDetails]);
  const displayRunsForUser = () => {
    const userRuns = [];
    user.runs.forEach((runId) => {
      userRuns.push(runs[runId]);
    });
    if (user.runs.length === 0) {
      return (
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          No Upcoming Runs
        </Typography>
      );
    } else {
      return (
        <>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Upcoming Runs
          </Typography>
          <Table size="small">
            <TableHead>
              <TableCell colSpan={2}>Date</TableCell>
              <TableCell colSpan={2}>Location</TableCell>
              <TableCell colSpan={2}>Price</TableCell>
              <TableCell colSpan={2}>Capacity</TableCell>
            </TableHead>
            <TableBody>
              {user &&
                runs &&
                userRuns.map((run) => (
                  <React.Fragment key={run._id}>
                    <TableRow>
                      <TableCell colSpan={2}>{run.date}</TableCell>
                      <TableCell colSpan={2}>{run.location}</TableCell>
                      <TableCell colSpan={2}>${run.price}</TableCell>
                      <TableCell colSpan={2}>{run.capacity}</TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </>
      );
    }
  };

  const displayWaitListForUser = () => {
    const userWaitList = [];

    user.waitList.forEach((runId) => {
      userWaitList.push(runs[runId]);
    });
    if (user.waitList.length === 0) {
      return (
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Wait list is empty
        </Typography>
      );
    } else {
      return (
        <>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Wait listed runs
          </Typography>
          <Table size="small">
            <TableHead>
              <TableCell colSpan={2}>Date</TableCell>
              <TableCell colSpan={2}>Location</TableCell>
              <TableCell colSpan={2}>Price</TableCell>
              <TableCell colSpan={2}>Capacity</TableCell>
            </TableHead>
            <TableBody>
              {user &&
                runs &&
                userWaitList.map((run) => (
                  <React.Fragment key={run._id}>
                    <TableRow>
                      <TableCell colSpan={2}>{run.date}</TableCell>
                      <TableCell colSpan={2}>{run.location}</TableCell>
                      <TableCell colSpan={2}>${run.price}</TableCell>
                      <TableCell colSpan={2}>{run.capacity}</TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </>
      );
    }
  };
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        style={{ border: "1px solid black", height: "100%", width: "100%" }}
      >
        {!loading && !loadingRuns && user ? (
          displayRunsForUser()
        ) : (
          <CircularProgress />
        )}
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        style={{ border: "1px solid green", height: "100%", width: "100%" }}
      >
        {!loading && !loadingRuns && user ? (
          displayWaitListForUser()
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </div>
  );
};

export default withRouter(UpcomingRuns);
