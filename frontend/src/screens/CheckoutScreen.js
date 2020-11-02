import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Layout from "../components/Layout";
// import CheckoutForm from "../components/CheckoutForm";
import { getOrderDetails } from "../actions/orderActions";

const CheckoutScreen = ({ match }) => {
  const orderId = match.params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order, success: successDetails } = orderDetails;

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(orderId);

    if (orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId]);

  console.log(order);
  return <div>CHECKOUTSCREEN</div>;
};

export default CheckoutScreen;
