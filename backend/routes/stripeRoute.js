import Order from "../models/orderModel.js";
import Run from "../models/runModel.js";
import User from "../models/userModel.js";
import Stripe from "stripe";
import axios from "axios";

const stripe = new Stripe(
  "sk_test_51Hi0CkCw3D7iMvxsxTGNxXXGNndJ6qnjlZCIuFnGNWmpYl5FL5ajlrGhwiZ3KYsgXfGS8WUuWgMpva2CY1DxEctB00JUHZcox1"
);

const updateRunsAndUser = async (order) => {
  const { orderItems, userId } = order;
  const user = await User.findById(userId);
  if (user.orders === undefined) {
    user.orders = {};
  }
  debugger;

  for (let i = 0; i < orderItems.length; i++) {
    const item = orderItems[i];
    // console.log(item);
    const run = await Run.findById(item.run);
    const runId = run._id;
    user.runs.push(runId);
    debugger;
    user["orders"][item.run] = {
      runId: item.run,
      amountPaid: item.price,
      status: "paid",
    };
    debugger;

    run.users.push(userId);
    await user.save();
    await run.save();
    const emailOptions = {
      user: user,
      run: run,
    };
    confirmationEmail(emailOptions);
  }
};

const confirmationEmail = async (options) => {
  debugger;
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // axios.post(url[, data[, config]])
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

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { amount, orderId } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
      });
      // const refund = await stripe.refunds.create({
      //   amount: req.body.amount,
      //   payment_intent: paymentIntent
      // })
      //UPDATE ORDER TO PAID
      debugger;
      const order = await Order.findById(orderId);
      debugger;
      if (order) {
        order.isPaid = true;
        order["paymentIntent"] = paymentIntent.id;
        order.paidAt = Date.now();
        const updatedOrder = await order.save();
        console.log(updatedOrder);

        await updateRunsAndUser(order);
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
