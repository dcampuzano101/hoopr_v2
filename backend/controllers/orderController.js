import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @description: create new order
// @route: POST /api/orders
// @access: private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      userId: req.user._id,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @description: get all orders
// @route: GET /api/orders
// @access: admin/private
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});

  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("Could not fetch all orders");
  }
});

// @description: Get order by id
// @route: GET /api/orders/:id
// @access: private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("No order found");
  }
});

// @description: get current users orders
// @route: /api/orders/myorders
// @access: private
const getMyOrders = asyncHandler(async (req, res) => {
  //gets passed through config ( req.user._id ) in listMyOrders
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @description: updates order to paid
// @route: PUT /api/orders/:id/pay
// @access: private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  //frontend action gets dispatched on success response of payment method
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  addOrderItems,
  getOrders,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
};
