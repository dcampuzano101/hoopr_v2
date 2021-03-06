import React, { useEffect } from "react";
import {
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
import { createOrder } from "../actions/orderActions";
import { withRouter } from "react-router-dom";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

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

const CartSummary = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.totalPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price, 0)
  );
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success } = orderCreate;

  const placeOrderHandler = async () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        totalPrice: cart.totalPrice,
      })
    );
  };

  useEffect(() => {
    if (success) {
      history.push(`/checkout/${order._id}`);
      dispatch({
        type: ORDER_CREATE_RESET,
      });
    }
  }, [history, success, dispatch]);

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
            {/* <TableRow>
              <TableCell rowSpan={3} colSpan={1} />
              <TableCell colSpan={3}>Subtotal</TableCell>
              <TableCell colSpan={3} align="right">
                $420
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Tax</TableCell>
              <TableCell align="right">$69</TableCell>
            </TableRow> */}
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell align="right">${cart.totalPrice}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.submit}
          onClick={placeOrderHandler}
        >
          Proceed to checkout
        </Button>
      </Container>
    </React.Fragment>
  );
};

export default withRouter(CartSummary);
