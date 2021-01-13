import { createMuiTheme } from "@material-ui/core/styles";

/*
The typography object comes with 13 variants by default:
h1
h2
h3
h4
h5
h6
subtitle1
subtitle2
body1
body2
button
caption
overline
*/

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFFF",
    },
    secondary: {
      main: "#FFFF",
    },
  },
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: "italic",
    },
  },
});
