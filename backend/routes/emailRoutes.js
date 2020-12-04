import express from "express";
const router = express.Router();

import {
  confirmationEmail,
  reminderEmail,
  cancellationEmail,
} from "../controllers/emailController.js";

router.route("/confirm").post(confirmationEmail);

router.route("/reminder").post(reminderEmail);

router.route("/cancel").post(cancellationEmail);

export default router;
