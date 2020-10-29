// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { Table, Form, Button, Row, Col } from "react-bootstrap";
// // import { LinkContainer } from "react-router-bootstrap";
// // import Message from "../components/Message";
// // import Loader from "../components/Loader";
// import { getUserDetails, updateUserProfile } from "../actions/userActions";
// // import { listMyOrders } from "../actions/orderActions";
// import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

// import clsx from "clsx";
// import { makeStyles } from "@material-ui/core/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Drawer from "@material-ui/core/Drawer";
// import Box from "@material-ui/core/Box";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import List from "@material-ui/core/List";
// import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";
// import IconButton from "@material-ui/core/IconButton";
// import Badge from "@material-ui/core/Badge";
// import Container from "@material-ui/core/Container";
// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
// import Link from "@material-ui/core/Link";
// import MenuIcon from "@material-ui/icons/Menu";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import NotificationsIcon from "@material-ui/icons/Notifications";
// import { mainListItems, secondaryListItems } from "./listItems";
// import Chart from "./Chart";
// import Deposits from "./Deposits";
// import Orders from "./Orders";

// const ProfileScreen = ({ location, history }) => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState(null);

//   //maybe setMessage for success

//   const dispatch = useDispatch();

//   const userDetails = useSelector((state) => state.userDetails);
//   const { loading, error, user } = userDetails;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
//   const { success } = userUpdateProfile;

//   console.log(userDetails);
//   console.log(user);

//   useEffect(() => {
//     if (!userInfo) {
//       history.push("/login");
//     } else {
//       if (!user) {
//         dispatch(getUserDetails("profile"));
//       } else {
//         setUsername(user.name);
//         setEmail(user.email);
//       }
//     }
//   }, [dispatch, history, location, userInfo, user]);
//   return <>PROFILESCREEN</>;
// };

// export default ProfileScreen;
