import React from "react";
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
function preventDefault(event) {
  event.preventDefault();
}

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

const UpcomingRuns = () => {
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user, success: successDetails } = userDetails;

  const runList = useSelector((state) => state.runList);
  const { runs } = runList;

  const classes = useStyles();
  return (
    <React.Fragment>
      {/* style heading in makeStyles */}
      <Typography className={classes.heading}>Upcoming Runs</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Players</TableCell>
          </TableRow>
        </TableHead>
        {!runs ? (
          <CircularProgress />
        ) : (
          <TableBody>
            {runs.map((run) => (
              <React.Fragment key={run._id}>
                <TableRow>
                  <TableCell>{run.date}</TableCell>
                  <TableCell>{run.location}</TableCell>
                  <TableCell>{`${run.startTime} - ${run.endTime}`}</TableCell>
                  <TableCell>
                    {run.users.length} / {run.capacity}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        )}
      </Table>
    </React.Fragment>
  );
};

export default UpcomingRuns;
