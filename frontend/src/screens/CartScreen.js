import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { openModal } from "../actions/modalActions";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Paper from "@material-ui/core/Paper";
import CartSummary from "../components/CartSummary";
import Modal from "../components/Modal";

import { Delete } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

import Alert from "@material-ui/lab/Alert";
import {
  Button,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "20%",
    flexShrink: 0,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
  },
  fixedHeight: {
    height: 240,
  },
  alertMessage: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  alertIcon: {
    display: "flex",
    alignItems: "center",
  },
}));

const CartScreen = ({ match }) => {
  const runId = match.params.id;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const modal = useSelector((state) => state.modal);
  const { isActive, modalType } = modal;

  const [deleteAlert, setDeleteAlert] = useState(null);

  const [removeRunId, setRemoveRunId] = useState(null);

  useEffect(() => {
    if (runId) {
      dispatch(addToCart(runId));
    }
  }, [dispatch, runId]);

  const removeFromCartHandler = (runId) => {
    dispatch(removeFromCart(runId));
  };

  const modalHandler = (runId) => {
    setRemoveRunId(runId);
    dispatch(openModal());
  };

  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      {/* <div className={classes.appBarSpacer} /> */}
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={8}>
            {isActive && (
              <Modal
                type="delete"
                id={removeRunId}
                onConfirm={removeFromCartHandler}
                heading="Remove Run From Cart"
              />
            )}
            <Paper className={classes.paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2}>Date</TableCell>
                    <TableCell colSpan={4}>Location</TableCell>
                    <TableCell colSpan={2}>Start Time</TableCell>
                    <TableCell colSpan={2}>End Time</TableCell>
                    <TableCell colSpan={2}>Price</TableCell>
                    <TableCell colSpan={2}>*</TableCell>
                  </TableRow>
                  {cartItems.map((run) => (
                    <>
                      <TableRow key={run.run}>
                        <TableCell colSpan={2}>{run.date}</TableCell>
                        <TableCell colSpan={4}>{run.location}</TableCell>
                        <TableCell colSpan={2}>{run.startTime}</TableCell>
                        <TableCell colSpan={2}>{run.endTime}</TableCell>
                        <TableCell colSpan={2}>{run.price}</TableCell>
                        <TableCell colSpan={2}>
                          {" "}
                          <IconButton
                            aria-label="delete"
                            onClick={() => modalHandler(run.run)}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>

                      {deleteAlert === run.run ? (
                        <TableCell colSpan={15}>
                          <Alert
                            severity="warning"
                            classes={{
                              icon: classes.alertIcon,
                              message: classes.alertMessage,
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
                                removeFromCartHandler(run.run);
                                setDeleteAlert(null);
                              }}
                              startIcon={<Delete />}
                            >
                              Delete
                            </Button>
                          </Alert>
                        </TableCell>
                      ) : null}
                    </>
                  ))}
                </TableHead>
              </Table>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            lg={4}
            style={{ display: "flex", width: "100%" }}
          >
            <Paper className={classes.paper}>
              <CartSummary cartItems={cartItems} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default CartScreen;
