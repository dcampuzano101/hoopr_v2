import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../actions/userActions";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";

import {
  Button,
  TextField,
  FormGroup,
  FormControlLabel,
  Switch,
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
  },
  fixedHeight: {
    height: 240,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paperProfileCard: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between",
  },
}));

const UserEditScreen = ({ history, match }) => {
  const userId = match.params.id;
  const userDetails = useSelector((state) => state.userDetails);
  const { error, user, success: successDetails } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [updateUserBtnDisabled, setUpdateUserBtnDisabled] = useState(true);
  const [alert, setAlert] = useState(null);
  const [detailsError, setDetailsError] = useState(null);
  const [userUpdateSuccess, setUserUpdateSuccess] = useState(null);

  const classes = useStyles();
  const dispatch = useDispatch();

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success } = userUpdate;

  const updateUserHandler = (e) => {
    e.preventDefault();
    debugger;
    dispatch(updateUser({ id: user._id, username, email, isAdmin }));
  };

  const handleAdminChange = (e) => {
    setUpdateUserBtnDisabled(false);
    setIsAdmin(e.target.checked);
  };

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push("/login");
    } else {
      if (!user || user._id !== userId) {
        dispatch(getUserDetails(userId));
      }

      if (successDetails || success) {
        setUsername(user.username);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }

      if (error) {
        setDetailsError(error);
      }

      if (success) {
        setUserUpdateSuccess("Successfully updated user!");
      }
    }
  }, [
    dispatch,
    history,
    userInfo,
    user,
    success,
    error,
    successDetails,
    userId,
  ]);
  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6} style={{ display: "flex" }}>
            <Paper className={classes.paper}>
              <form
                className={classes.form}
                noValidate
                onSubmit={updateUserHandler}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="username"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUpdateUserBtnDisabled(false);
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setUpdateUserBtnDisabled(false);
                  }}
                />
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isAdmin}
                        onChange={handleAdminChange}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Admin"
                  />
                </FormGroup>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={updateUserBtnDisabled}
                >
                  UPDATE USER
                </Button>
              </form>
            </Paper>
          </Grid>
          {userUpdateSuccess ? (
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Alert
                  severity="success"
                  onClose={() => {
                    setUserUpdateSuccess(null);
                  }}
                >
                  {userUpdateSuccess}
                </Alert>
              </Paper>
            </Grid>
          ) : null}
          {detailsError ? (
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Alert
                  severity="error"
                  onClose={() => {
                    setDetailsError(null);
                  }}
                >
                  {detailsError}
                </Alert>
              </Paper>
            </Grid>
          ) : null}
          {alert ? (
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Alert
                  severity="error"
                  onClose={() => {
                    setAlert(null);
                  }}
                >
                  {alert}
                </Alert>
              </Paper>
            </Grid>
          ) : null}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default UserEditScreen;
