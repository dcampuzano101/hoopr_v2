import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ProfileCard from "../components/profile/ProfileCard";
import Deposits from "../components/profile/Deposits";
import Title from "../components/profile/Title";

import { ExpandMore, Delete } from "@material-ui/icons";

// import Alert from "@material-ui/lab/Alert";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  CircularProgress,
  Button,
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
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
  },
  fixedHeight: {
    height: 240,
  },
}));

const CartScreen = ({ history, match }) => {
  const runId = match.params.id;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    console.log(runId);

    if (runId) {
      dispatch(addToCart(runId));
    }
  }, [dispatch, runId]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // const checkoutHandler = () => {
  //   history.push("/login?redirect=shipping");
  // };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={classes.paper}>
                {/* <Title>CART ITEMS</Title> */}
                {/* <Paper className={classes.paper}> */}
                <Accordion disabled>
                  <AccordionSummary
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                    expandIcon={<ExpandMore />}
                  >
                    <Typography className={classes.heading}>DATE</Typography>
                    <Typography className={classes.heading}>
                      LOCATION
                    </Typography>
                    <Typography className={classes.heading}>
                      START TIME
                    </Typography>
                    <Typography className={classes.heading}>
                      END TIME
                    </Typography>
                    <Typography className={classes.heading}>PRICE</Typography>
                  </AccordionSummary>
                </Accordion>
                {cartItems.map((run) => (
                  <React.Fragment key={run._id}>
                    <Accordion>
                      <AccordionSummary
                        className={classes.noHover}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        expandIcon={<ExpandMore />}
                      >
                        <Typography className={classes.heading}>
                          {run.date}
                        </Typography>
                        <Typography className={classes.heading}>
                          {run.location}
                        </Typography>
                        <Typography className={classes.heading}>
                          {run.startTime}
                        </Typography>
                        <Typography className={classes.heading}>
                          {run.endTime}
                        </Typography>
                        <Typography className={classes.heading}>
                          ${run.price}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Button>
                          <Delete onClick={console.log("delete")} />
                        </Button>
                      </AccordionDetails>
                    </Accordion>
                  </React.Fragment>
                ))}
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid
              item
              xs={12}
              md={6}
              lg={6}
              style={{ display: "flex", width: "100%" }}
            >
              <Paper className={classes.paper}>
                <Deposits />
              </Paper>
            </Grid>
            {/* Recent Runs */}
            {/* <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Runs />
              </Paper>
            </Grid> */}
          </Grid>
        </Container>
      </main>
    </div>
  );
};
export default CartScreen;

/*



                <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            Avatar with text and icon
          </Typography>
          <div className={classes.demo}>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Single-line item"
                  secondary={secondary ? "Secondary text" : null}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
        </Grid>

 <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={8} style={{ display: "flex" }}>
            <Title>CART ITEMS</Title>
            <Paper className={classes.paper}>
              <Accordion disabled>
                <AccordionSummary
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                  expandIcon={<ExpandMore />}
                >
                  <Typography className={classes.heading}>DATE</Typography>
                  <Typography className={classes.heading}>LOCATION</Typography>
                  <Typography className={classes.heading}>
                    START TIME
                  </Typography>
                  <Typography className={classes.heading}>END TIME</Typography>
                  <Typography className={classes.heading}>PRICE</Typography>
                </AccordionSummary>
              </Accordion>
              {cartItems.map((run) => (
                <React.Fragment key={run._id}>
                  <Accordion>
                    <AccordionSummary
                      className={classes.noHover}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography className={classes.heading}>
                        {run.date}
                      </Typography>
                      <Typography className={classes.heading}>
                        {run.location}
                      </Typography>
                      <Typography className={classes.heading}>
                        {run.startTime}
                      </Typography>
                      <Typography className={classes.heading}>
                        {run.endTime}
                      </Typography>
                      <Typography className={classes.heading}>
                        ${run.price}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Button>
                        <DeleteIcon onClick={console.log("delete")} />
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                </React.Fragment>
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={6} style={{ display: "flex" }}>
            <Paper className={classes.paper}>
              <form
                className={classes.form}
                noValidate
                // onSubmit={updateProfileHandler}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="username"
                  // label="Username"
                  placeholder="Username"
                  name="username"
                  // autoComplete="username"
                  // value={username}
                  // onChange={(e) => {
                  //   setUsername(e.target.value);
                  //   setUpdateProfileBtnDisabled(false);
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  // value={email}
                  // onChange={(e) => {
                  //   setEmail(e.target.value);
                  //   setUpdateProfileBtnDisabled(false);
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  // value={password}
                  // onChange={(e) => {
                  //   setPassword(e.target.value);
                  //   setUpdateProfileBtnDisabled(false);
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  // value={confirmPassword}
                  // onChange={(e) => {
                  // setConfirmPassword(e.target.value);
                  // setUpdateProfileBtnDisabled(false);
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  // disabled={updateProfileBtnDisabled}
                >
                  UPDATE PROFILE
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>


*/
