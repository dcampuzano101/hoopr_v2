import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  updateUserProfile,
  updateUserProfilePhoto,
} from "../../actions/userActions";
import { mediaToAWS } from "../../actions/awsAction";

import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import avatar from "../../assets/user-avatar.png";
import { withRouter } from "react-router-dom";

import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { DropzoneDialog } from "material-ui-dropzone";
import Alert from "@material-ui/lab/Alert";

import {
  Avatar,
  Button,
  CircularProgress,
  CssBaseline,
  TextField,
  Link,
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
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    width: "100%",
  },
  paperProfileCard: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between",
  },
  fixedHeight: {
    height: 240,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
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

const ProfileCard = ({ location, history, match }) => {
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user, success: successDetails } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfilePhoto = useSelector(
    (state) => state.userUpdateProfilePhoto
  );
  const { success: successProfilePhoto, photoUrl } = userUpdateProfilePhoto;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePhotoFile, setProfilePhotoFile] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("" || avatar);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [updateProfileBtnDisabled, setUpdateProfileBtnDisabled] = useState(
    true
  );
  const [alert, setAlert] = useState(null);
  const [detailsError, setDetailsError] = useState(null);
  const [profileSuccess, setProfileSuccess] = useState(null);

  const classes = useStyles();
  const dispatch = useDispatch();

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, username, email, password }));
    }
  };

  const imgUploadHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (profilePhotoFile) {
      formData.append("media", profilePhotoFile);
      const { data } = await mediaToAWS(formData);
      setProfilePhoto(data.mediaUrl);

      dispatch(
        updateUserProfile({
          id: user._id,
          username,
          email,
          password,
          profilePhoto: data.mediaUrl,
        })
      );
    }
  };

  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user) {
        dispatch(getUserDetails("profile"));
      }

      if (successDetails) {
        setUsername(user.username);
        setEmail(user.email);
        setProfilePhoto(user.profilePhoto || avatar);
      }

      if (error) {
        setDetailsError(error);
      }

      if (success) {
        setProfileSuccess("Successfully updated profile!");
      }
    }
  }, [dispatch, history, location, userInfo, user, success, error]);
  console.log(location.search.slice(1));
  console.log(history, match, location);
  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={6} lg={6} style={{ display: "flex" }}>
            <Paper className={classes.paperProfileCard}>
              <div>
                <img
                  src={profilePhoto}
                  alt="avatar"
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpen(true)}
                  style={{ width: "100%", marginBottom: "9%" }}
                >
                  Change Photo
                </Button>
                <DropzoneDialog
                  acceptedFiles={["image/*"]}
                  cancelButtonText={"cancel"}
                  submitButtonText={"submit"}
                  maxFileSize={5000000}
                  open={open}
                  onClose={() => setOpen(false)}
                  onSave={(files) => {
                    const file = files[0];
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                      setBtnDisabled(false);
                      setProfilePhotoFile(file);
                      setProfilePhoto(reader.result);
                    };

                    console.log("Files:", files);
                    setOpen(false);
                  }}
                  showPreviews={true}
                  showFileNamesInPreview={true}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={btnDisabled}
                  style={{ marginTop: "7%" }}
                  onClick={imgUploadHandler}
                >
                  SAVE PHOTO
                </Button>
              </div>
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={6} lg={6} style={{ display: "flex" }}>
            <Paper className={classes.paper}>
              <form
                className={classes.form}
                noValidate
                onSubmit={updateProfileHandler}
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
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUpdateProfileBtnDisabled(false);
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
                    setUpdateProfileBtnDisabled(false);
                  }}
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
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setUpdateProfileBtnDisabled(false);
                  }}
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
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setUpdateProfileBtnDisabled(false);
                  }}
                />
                {/* CONFIRMPASSWORD */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={updateProfileBtnDisabled}
                >
                  UPDATE PROFILE
                </Button>
              </form>
            </Paper>
          </Grid>
          {profileSuccess ? (
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Alert
                  severity="success"
                  onClose={() => {
                    setProfileSuccess(null);
                  }}
                >
                  {profileSuccess}
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

export default withRouter(ProfileCard);
