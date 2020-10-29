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
} from "@material-ui/core";
import {
  AccountCircle,
  ShoppingCart,
  SupervisorAccount,
} from "@material-ui/icons/";

import MenuIcon from "@material-ui/icons/Menu";

import { useTheme } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import customTheme from "../theme.js";
import { useSelector } from "react-redux";

const { heading } = customTheme.text;
const useStyles = makeStyles((theme) => ({
  logoButton: {
    style: "none",
    fontFamily: heading.font,
    fontSize: heading.size,
    lineHeight: heading.lineHeight,
    textTransform: heading.transform,
    letterSpacing: heading.spacing,
    fontWeight: heading.weight,
    color: customTheme.palette.primary.light,
    "&:hover": {
      backgroundColor: customTheme.palette.primary.main,
    },
  },
  root: {},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {},
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
        <AccountCircle fontSize="large" />
      </IconButton>
      <IconButton onClick={() => handleMenuClick("/cart")}>
        <ShoppingCart fontSize="large" />
      </IconButton>
      {isAdmin ? (
        <IconButton onClick={() => handleMenuClick("/admin")}>
          <SupervisorAccount fontSize="large" />
        </IconButton>
      ) : null}
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar
        style={{
          backgroundColor: customTheme.palette.primary.main,
          marginBottom: "1rem",
        }}
        position="static"
      >
        <Toolbar className={classes.toolBar}>
          <Button
            className={classes.logoButton}
            onClick={() => handleMenuClick("/")}
          >
            Hoopr
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
