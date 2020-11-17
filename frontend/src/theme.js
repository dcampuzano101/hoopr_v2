import { createMuiTheme } from "@material-ui/core";

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#546e7a",
      light: "#819ca9",
      dark: "#29434e",
      contrastText: "#ffff",
    },
    secondary: {
      main: "#b0bec5",
      light: "#e2f1f8",
      dark: "#808e95",
      contrastText: "#000000",
    },
  },
  typography: {
    h1: {
      fontFamily: "Lilita One",
      weight: 400,
      fontSize: "3rem",
      spacing: "2px",
      transform: "lowercase",
      opacity: 0.8,
      letterSpacing: "1",
      color: "#ffff",
    },
    banner: {
      h1: {
        fontFamily: "Lilita One",
        weight: 600,
        fontSize: "5rem",
        spacing: "2px",
        transform: "lowercase",
        opacity: 0.8,
        letterSpacing: "1",
        color: "#ffff",
      },
    },
  },
});

export { muiTheme };
