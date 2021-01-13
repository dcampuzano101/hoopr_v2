import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import theme from "./styles/theme";

const useStyles = makeStyles(({ palette }: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    color: palette.secondary.light,
  },
}));

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  const classes = useStyles(theme);
  return (
    <>
      <Typography className={classes.root} variant="h1">
        Hello Welcome to My TS React App
      </Typography>
    </>
  );
};

export default App;
