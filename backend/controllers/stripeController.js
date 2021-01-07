import Order from "../models/orderModel.js";
import Run from "../models/runModel.js";
import User from "../models/userModel.js";
import Stripe from "stripe";
import axios from "axios";
import moment from "moment";

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

const amountToRefund = (run) => {
  // percentages can always be modified
  // run.start >= 48 hours = 100% refund
  // run.start >= 24 hours = 75% refund
  // run.start >= 12 hours = 25% refund
  // run.start < 12 hours = 0% refund
  let amount = run.price * 100;
  let now = moment(new Date());
  let runStartTime = moment(`${run.date} ${run.startTime.split(" ")[4]}`);
  let hoursRemaining = moment.duration(runStartTime.diff(now)).asHours();
  let percent;
  if (hoursRemaining >= 48) {
    percent = 1;
  } else if (hoursRemaining >= 24) {
    percent = 0.75;
  } else if (hoursRemaining >= 12) {
    percent = 0.25;
  }
  return amount * percent;
};

const createRefund = async (req, res) => {
  // validate amountToRefund.
  if (req.method === "POST") {
    try {
      const amount = amountToRefund(req.body.run);
      const refund = await stripe.refunds.create({
        payment_intent: req.body.paymentIntent,
        amount: amount,
      });
      const emailOptions = {
        user: req.body.user,
        run: req.body.run,
      };

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
