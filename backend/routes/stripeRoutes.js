import express from "express";
const router = express.Router();

import {
  createRefund,
  createPaymentIntent,
} from "../controllers/stripeController.js";

router.route("/payment_intents").post(createPaymentIntent);

router.route("/refund").post(createRefund);

export default router;
