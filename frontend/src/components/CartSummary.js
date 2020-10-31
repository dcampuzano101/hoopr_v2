import React from "react";
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(24),
    flexBasis: "20%",
    flexShrink: 0,
  },
}));

const CartSummary = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography className={classes.heading}>Cart Summary</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Players</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </React.Fragment>
  );
};

export default CartSummary;
