import React, { useState, useEffect } from "react";
import avatar from "../assets/user-avatar.png";
import {
  Avatar,
  Button,
  CircularProgress,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  makeStyles,
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

const PublicProfile = (props) => {
  const [user, setUser] = useState(null);

  const [username, setUsername] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => {
    debugger;
    const newUser = props.user;
    // if (user.email !== )
    setUser((user) => newUser);
    setUsername((user) => newUser.username);
    setProfilePhoto((user) => newUser.profilePhoto);
  }, []);

  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={12} lg={12}>
          <img
            src={profilePhoto}
            alt="avatar"
            style={{
              width: "100%",
              borderRadius: "5px",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default PublicProfile;
