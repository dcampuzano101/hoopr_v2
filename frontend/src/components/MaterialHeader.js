import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  useMediaQuery,
  Typography,
} from "@material-ui/core";
import {
  AccountCircle,
  ShoppingCart,
  SupervisorAccount,
} from "@material-ui/icons/";
import hooprLogo from "../assets/hoopr_logo.png";

import MenuIcon from "@material-ui/icons/Menu";

import { useTheme } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  logoButton: {
    style: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
    width: "7%",
  },
  iconFilter: {
    filter:
      "invert(100%) sepia(49%) saturate(3315%) hue-rotate(177deg) brightness(112%) contrast(94%)",
  },
  root: {},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logoImg: {
    width: "125%",
    height: "50%",
    filter:
      "invert(100%) sepia(49%) saturate(3315%) hue-rotate(177deg) brightness(112%) contrast(94%)",
  },
}));

const MaterialHeader = ({ history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const isAdmin = userInfo ? (userInfo.isAdmin ? true : false) : false;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  const HeaderLinks = () => (
    <div
      style={{ display: "flex", width: "18%", justifyContent: "space-evenly" }}
    >
      <IconButton onClick={() => handleMenuClick("/profile")}>
        <AccountCircle className={classes.iconFilter} fontSize="large" />
      </IconButton>
      <IconButton onClick={() => handleMenuClick("/cart")}>
        <ShoppingCart className={classes.iconFilter} fontSize="large" />
      </IconButton>
      {isAdmin ? (
        <IconButton onClick={() => handleMenuClick("/admin")}>
          <SupervisorAccount className={classes.iconFilter} fontSize="large" />
        </IconButton>
      ) : null}
    </div>
  );
  return (
    <div className={classes.root}>
      <AppBar
        style={{
          backgroundColor: theme.palette.primary.main,
          marginBottom: "1rem",
        }}
        position="static"
      >
        <Toolbar className={classes.toolBar}>
          <Button
            className={classes.logoButton}
            onClick={() => handleMenuClick("/")}
          >
            {/* <Typography variant="h1">Hoopr</Typography> */}
            <img src={hooprLogo} alt="" className={classes.logoImg} />
          </Button>
          {isMobile ? (
            <div>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => handleMenuClick("profile")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick("cart")}>
                  Cart
                </MenuItem>
                {isAdmin ? (
                  <MenuItem onClick={() => handleMenuClick("admin")}>
                    Admin
                  </MenuItem>
                ) : null}
              </Menu>
            </div>
          ) : (
            <HeaderLinks />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(MaterialHeader);
