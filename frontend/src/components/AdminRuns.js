import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { listRuns } from "../actions/runActions";
import { withRouter } from "react-router-dom";
import { deleteRun } from "../actions/runActions";
import moment from "moment";
import Modal from "./Modal";
import { openModal } from "../actions/modalActions";
import RunCreateScreen from "../screens/RunCreateScreen";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
  CircularProgress,
  IconButton,
  Button,
} from "@material-ui/core";

import { Delete, Edit } from "@material-ui/icons";

import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
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
  submit: {
    height: "1.5rem",
    display: "flex",
  },
  adminRunHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const AdminRuns = ({ history, match, location }) => {
  const classes = useStyles();
  const [runsError, setRunsError] = useState(null);
  const [removeRunId, setRemoveRunId] = useState(null);

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

  const modal = useSelector((state) => state.modal);
  const { isActive } = modal;
  const createModalHandler = () => {
    dispatch(openModal());
  };

  const deleteModalHandler = (runId) => {
    setRemoveRunId(runId);
    dispatch(openModal());
  };

  return (
    <>
      {loading || loadingDelete ? (
        <CircularProgress />
      ) : (
        <>
          <div className={classes.adminRunHeader}>
            {isActive && removeRunId === null && (
              <Modal Component={<RunCreateScreen />} heading="Create Run" />
            )}
            {removeRunId !== null && isActive && (
              <Modal
                type="delete"
                id={removeRunId}
                onConfirm={deleteRunHandler}
                heading="Permanently Delete Run"
              />
            )}

            <h1 className="bannerShadow" style={{ fontSize: "35px" }}>
              ALL RUNS
            </h1>
            <Button
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={createModalHandler}
            >
              CREATE RUN
            </Button>
          </div>
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
                {runs &&
                  Object.values(runs).map((run) => (
                    <React.Fragment key={run._id}>
                      <TableRow>
                        <TableCell colSpan={2}>{run.date}</TableCell>
                        <TableCell colSpan={4}>{run.location}</TableCell>
                        <TableCell colSpan={2}>
                          {moment(run.startTime).format("LT")}
                        </TableCell>
                        <TableCell colSpan={2}>
                          {moment(run.endTime).format("LT")}
                        </TableCell>
                        <TableCell colSpan={2}>${run.price}</TableCell>
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
                            onClick={() => deleteModalHandler(run._id)}
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
        </>
      )}
    </>
  );
};

export default withRouter(AdminRuns);
