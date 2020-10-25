import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  addOrderItems,
  getOrders,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
} from "../controllers/orderController.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);

router.route("/:id").get(protect, getOrderById);

router.route("/myorders").get(protect, getMyOrders);

router.route("/:id/pay").put(protect, updateOrderToPaid);

// //manually edit order
// router.route("/:id/update").put(protect, admin, updateOrder);

export default router;
