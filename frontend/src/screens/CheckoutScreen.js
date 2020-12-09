import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../actions/orderActions";

import Layout from "../components/Layout";
import CheckoutForm from "../components/CheckoutForm";
import { CircularProgress } from "@material-ui/core";

const CheckoutScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId]);

  const successCheckout = () => {
    debugger;
    history.push("/?stripe=success");
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
            email={userInfo.email}
          />
        </Layout>
      )}
    </div>
  );
};

export default CheckoutScreen;
