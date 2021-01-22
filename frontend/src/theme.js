import { createMuiTheme } from "@material-ui/core";

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#fafafa",
      light: "#ffffff",
      dark: "#c7c7c7",
      contrastText: "#000000",
    },
    secondary: {
      main: "#f5f5f5",
      light: "#fafafa",
      dark: "#c2c2c2",
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
