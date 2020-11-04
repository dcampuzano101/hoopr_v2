import Order from "../models/orderModel.js";
import Run from "../models/runModel.js";
import User from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51Hi0CkCw3D7iMvxsxTGNxXXGNndJ6qnjlZCIuFnGNWmpYl5FL5ajlrGhwiZ3KYsgXfGS8WUuWgMpva2CY1DxEctB00JUHZcox1"
);

const updateRuns = async (orderItems, userId) => {
  const user = await User.findById(userId);

  for (let i = 0; i < orderItems.length; i++) {
    const item = orderItems[i];
    console.log(item);
    const run = await Run.findById(item.run);
    const runId = run._id;
    user.runs.push({ runId });

    run.users.push({
      userId,
      username: user.username,
      profilePhoto: user.profilePhoto,
    });
    await user.save();
    await run.save();
  }
};

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { amount, orderId, userId } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
      });

      //UPDATE ORDER TO PAID
      const order = await Order.findById(orderId);

      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        const updatedOrder = await order.save();
        console.log(updatedOrder);

        const { orderItems, userId } = order;
        await updateRuns(orderItems, userId);
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
