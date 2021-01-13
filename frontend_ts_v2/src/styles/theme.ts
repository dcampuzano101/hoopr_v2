import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ffffff",
      main: "#fafafa",
      dark: "#c7c7c7",
      contrastText: "#000000",
    },
    secondary: {
      light: "#2c2f48",
      main: "#040521",
      dark: "#000000",
      contrastText: "#ffffff",
    },
  },

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
  typography: {
    fontFamily: ["Rubik", "Karla", "serif"].join(","),
    h1: {
      fontFamily: "Rubik",
    },
    body1: {
      fontFamily: "Karla",
    },
  },
});

export default theme;
