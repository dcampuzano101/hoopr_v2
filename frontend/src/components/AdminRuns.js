import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { listRuns } from "../actions/runActions";
import { withRouter } from "react-router-dom";
import { deleteRun } from "../actions/runActions";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
  Grid,
  CircularProgress,
  IconButton,
  Button,
} from "@material-ui/core";

import { Delete, Edit } from "@material-ui/icons";

import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
  alertMessage: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  alertIcon: {
    display: "flex",
    alignItems: "center",
  },
}));

const AdminRuns = ({ history, match, location }) => {
  const classes = useStyles();
  const [runsError, setRunsError] = useState(null);

  const [deleteAlert, setDeleteAlert] = useState(null);

  const runList = useSelector((state) => state.runList);
  const { runs, loading, error } = runList;

  const runDelete = useSelector((state) => state.runDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = runDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listRuns());
  }, [dispatch, successDelete, errorDelete, loadingDelete]);

  const deleteRunHandler = (runId) => {
    dispatch(deleteRun(runId));
  };
  console.log(runs);
  return (
    <>
      {loading || loadingDelete ? (
        <CircularProgress />
      ) : (
        <Container className={classes.container}>
          <Typography>ALL RUNS</Typography>
          <Paper className={classes.paper}>
            {error && (
              <Alert
                severity="error"
                onClose={() => {
                  setRunsError(null);
                }}
              >
                {error}
              </Alert>
            )}
            {errorDelete && (
              <Alert
                severity="error"
                onClose={() => {
                  setRunsError(null);
                }}
              >
                {errorDelete}
              </Alert>
            )}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2}>Date</TableCell>
                  <TableCell colSpan={4}>Location</TableCell>
                  <TableCell colSpan={2}>Start Time</TableCell>
                  <TableCell colSpan={2}>End Time</TableCell>
                  <TableCell colSpan={2}>Price</TableCell>
                  <TableCell colSpan={2}>Capacity</TableCell>
                  <TableCell colSpan={2} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {runs.map((run) => (
                  <React.Fragment key={run._id}>
                    <TableRow>
                      <TableCell colSpan={2}>{run.date}</TableCell>
                      <TableCell colSpan={4}>{run.location}</TableCell>
                      <TableCell colSpan={2}>{run.startTime}</TableCell>
                      <TableCell colSpan={2}>{run.endTime}</TableCell>
                      <TableCell colSpan={2}>{run.price}</TableCell>
                      <TableCell colSpan={2}>{run.capacity}</TableCell>
                      <TableCell colSpan={2} align="right">
                        {" "}
                        <IconButton
                          aria-label="edit"
                          onClick={() => {
                            history.push(`/runs/${run._id}/edit`);
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => setDeleteAlert(run._id)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    {deleteAlert === run._id ? (
                      <TableCell colSpan={15}>
                        <Alert
                          severity="warning"
                          classes={{
                            message: classes.alertMessage,
                            icon: classes.alertIcon,
                          }}
                          onClose={() => {
                            setDeleteAlert(null);
                          }}
                        >
                          Are you sure?
                          <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={() => {
                              deleteRunHandler(run._id);
                              setDeleteAlert(null);
                            }}
                            startIcon={<Delete />}
                          >
                            Delete
                          </Button>
                        </Alert>
                      </TableCell>
                    ) : null}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Container>
      )}
    </>
  );
};

export default withRouter(AdminRuns);
