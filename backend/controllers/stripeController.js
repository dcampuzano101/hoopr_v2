import Order from "../models/orderModel.js";
import Run from "../models/runModel.js";
import User from "../models/userModel.js";
import Stripe from "stripe";
import axios from "axios";

const stripe = new Stripe(
  "sk_test_51Hi0CkCw3D7iMvxsxTGNxXXGNndJ6qnjlZCIuFnGNWmpYl5FL5ajlrGhwiZ3KYsgXfGS8WUuWgMpva2CY1DxEctB00JUHZcox1"
);

const updateRunsAndUser = async (order, paymentIntent) => {
  const { orderItems, userId } = order;
  const user = await User.findById(userId);
  for (let i = 0; i < orderItems.length; i++) {
    const item = orderItems[i];
    const run = await Run.findById(item.run);
    const runId = run._id;

    user.runs.push(runId);
    user.orders[`${String(runId)}`] = {
      runId: String(item.run),
      amountPaid: item.price,
      status: "paid",
      paymentIntent: paymentIntent.id,
    };
    user.markModified("orders");
    run.users.push(userId);
    await run.save();
    await user.save();
    const emailOptions = {
      user: user,
      run: run,
    };
    confirmationEmail(emailOptions);
  }
};

const confirmationEmail = async (options) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://localhost:5000/api/email/confirm",
      options,
      config
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const cancellationEmail = async (options) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    debugger;
    const { data } = await axios.post(
      "http://localhost:5000/api/email/cancel",
      options,
      config
    );

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
const createPaymentIntent = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { amount, orderId } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
      });
      //UPDATE ORDER TO PAID
      const order = await Order.findById(orderId);
      if (order) {
        order.isPaid = true;
        order["paymentIntent"] = paymentIntent.id;
        order.paidAt = Date.now();
        const updatedOrder = await order.save();

        await updateRunsAndUser(order, paymentIntent);
      }
      res.status(200).send(paymentIntent.client_secret);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

const createRefund = async (req, res) => {
  debugger;
  // validate amountToRefund.
  console.log(req);
  if (req.method === "POST") {
    try {
      const refund = await stripe.refunds.create({
        payment_intent: req.body.paymentIntent,
        amount: req.body.amount,
      });
      const emailOptions = {
        user: req.body.user,
        run: req.body.run,
      };
      debugger;
      if (refund) {
        console.log(refund);
        cancellationEmail(emailOptions);
      }
      res.status(200).send(refund);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export { createPaymentIntent, createRefund };
