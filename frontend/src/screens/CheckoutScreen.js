import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Layout from "../components/Layout";
// import CheckoutForm from "../components/CheckoutForm";
import { getOrderDetails, updateOrder } from "../actions/orderActions";
import { updateRun } from "../actions/runActions";

import Layout from "../components/Layout";
import CheckoutForm from "../components/CheckoutForm";
import { CircularProgress } from "@material-ui/core";

const CheckoutScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order, success: successDetails } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(orderId);

    if (orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId]);

  const getTotalPrice = (order) => {
    console.log(order);
  };

  const addUserToRuns = (order) => {
    if (order) {
      order.orderItems.forEach((run) => {
        debugger;
        console.log(`runb4 =${run}`);
        run.users = [...run.users, userInfo._id];
        console.log(run);
        dispatch(updateRun(run));
      });
    }
  };

  const successCheckout = () => {
    history.push("/profile/?checkoutsuccess");
  };
  return (
    <div>
      {!order ? (
        <CircularProgress />
      ) : (
        <Layout>
          {/*<OrderSummary /> */}
          <CheckoutForm
            price={order.totalPrice}
            onSuccessfulCheckout={() => successCheckout()}
            orderId={orderId}
            userId={userInfo._id}
          />
        </Layout>
      )}
    </div>
  );
};

export default CheckoutScreen;
