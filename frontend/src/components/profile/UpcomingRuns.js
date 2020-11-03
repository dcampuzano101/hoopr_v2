import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { getUserDetails } from "../../actions/userActions";
// import { useSelector } from "react-redux";
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
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user, success: successDetails } = userDetails;
  const [myRuns, setMyRuns] = useState(null);
  const runList = useSelector((state) => state.runList);
  const { runs } = runList;

  useEffect(() => {
    if (successDetails) {
      setMyRuns(getMyRuns());
    }
  }, [successDetails]);
  const getMyRuns = () => {
    const runIds = [];
    user.runs.forEach((runObj) => {
      const runId = runObj["runId"];
      runIds.push(runId);
    });

    const myRuns = [];

    for (let i = 0; i < runIds.length; i++) {
      let runId = runIds[i];

      for (let j = 0; j < runs.length; j++) {
        if (runId === runs[j]._id) {
          myRuns.push(runs[j]);
        }
      }
    }
    return myRuns;
  };
  console.log(user);
  console.log(myRuns);
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
        {!user ? (
          <CircularProgress />
        ) : (
          <TableBody>
            {myRuns
              ? myRuns.map((run) => (
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
                ))
              : null}
          </TableBody>
        )}
      </Table>
    </React.Fragment>
  );
};

export default UpcomingRuns;
