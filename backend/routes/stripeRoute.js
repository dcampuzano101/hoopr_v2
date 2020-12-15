import express from "express";
import Order from "../models/orderModel.js";
import Run from "../models/runModel.js";
import User from "../models/userModel.js";
import Stripe from "stripe";
import axios from "axios";

const stripe = new Stripe(
  "sk_test_51Hi0CkCw3D7iMvxsxTGNxXXGNndJ6qnjlZCIuFnGNWmpYl5FL5ajlrGhwiZ3KYsgXfGS8WUuWgMpva2CY1DxEctB00JUHZcox1"
);

const router = express.Router();

const updateRunsAndUser = async (order) => {
  const { orderItems, userId } = order;
  const user = await User.findById(userId);
  if (user.orders === undefined) {
    user.orders = {};
  }
  debugger;

  for (let i = 0; i < orderItems.length; i++) {
    debugger;
    const item = orderItems[i];
    item.status = "paid";
    const run = await Run.findById(item.run);
    const runId = run._id;
    user.runs.push(runId);
    debugger;
    user.orders[runId] = {
      run: run,
      amountPaid: item.price,
      status: "paid",
      paymentIntent: order.paymentIntent,
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

const createPaymentIntent = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { amount, orderId } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
      });

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

const handleDuration = (run) => {
  const startTime = run.startTime.split(" ")[4]; // "08:00:00"
  //try let
  const date = run.date.split(" ").slice();
  date[4] = startTime;

  date = date.join(" ");

  const now = moment(new Date());
  const end = moment(new Date(date));
  const duration = moment.duration(end.diff(now));
  const hours = duration.asHours();

  return hours;
};

let handleAmount = (hours, amountPaid) => {
  let percentRefund;
  switch (hours) {
    case hours >= 48:
      percentRefund = 1;
      break;
    case hours >= 24:
      percentRefund = 0.75;
      break;
    case hours >= 12:
      percentRefund = 0.5;
      break;

    default:
      percentRefund = 0;
      break;
  }
  return amountPaid * percentRefund;
};

const cancellationEmail = async (options) => {
  debugger;
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

const createRefund = async (req, res) => {
  if (req.method === "POST") {
    try {
      debugger;
      let { paymentIntent, run, amountPaid, user } = req.body;

      let hours = handleDuration(run);

      let amountToRefund = handleAmount(hours, amountPaid);

      let emailOptions = {
        user: user,
        run: run,
      };
      debugger;
      let refund = await stripe.refund.create({
        amount: amountToRefund,
        payment_intent: paymentIntent,
        currency: "usd",
      });
      debugger;
      cancellationEmail(emailOptions);

      res.status(200).send(refund);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

// const handleRefund = async (paymentIntent, run, user, amountPaid) => {
//   try {
//     const hours = handleDuration(run);

//     const amountToRefund = handleAmount(hours, amountPaid);

//     await createRefund(paymentIntent, amountToRefund);

//     const emailOptions = {
//       user: user,
//       run: run,
//     };

//     cancellationEmail(emailOptions);
//   } catch (error) {}
// };

router.route("/payment_intents").post(createPaymentIntent);
router.route("/refund").post(createRefund);

export default router;
