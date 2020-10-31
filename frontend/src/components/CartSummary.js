import React, { useEffect } from "react";
import {
  Link,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  CssBaseline,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const CartSummary = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const classes = useStyles();
  return (
    <React.Fragment>
      <Container>
        <CssBaseline />
        <Typography className={classes.heading}>Cart Summary</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>Details</TableCell>
              <TableCell align="right" colSpan={3}>
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((run) => (
              <TableRow key={run.id}>
                <TableCell colSpan={3}>{run.name}</TableCell>
                <TableCell colSpan={3} align="right">
                  ${run.price}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} colSpan={1} />
              <TableCell colSpan={3}>Subtotal</TableCell>
              <TableCell colSpan={3} align="right">
                $420
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Tax</TableCell>
              <TableCell align="right">$69</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell align="right">$42069</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.submit}
        >
          Proceed to checkout
        </Button>
      </Container>
    </React.Fragment>
  );
};

export default CartSummary;
