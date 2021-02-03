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

// @description: paginates results from API request 
// @access: private

const paginatedResults = async (model, page, limit) => {
  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const results = {}

  if (endIndex < (await model.countDocuments().exec())) {
    results.next = {
      page: page + 1,
      limit: limit
    }
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    }
  }
  try {
    results.results = await model
      .find()
      .limit(limit)
      .skip(startIndex)
      .select('-password')
      .exec()
    return results
  } catch (error) {
    throw new Error('Problem returning paginated results')
  }
}



// @description: get all orders
// @route: GET /api/orders
// @access: admin/private
const getOrders = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const results = await paginatedResults(Order, page, limit)
  const data = results.results

  const ordersObj = {};
  const orders = {};

  if (results.next) {
    ordersObj['next'] = results.next
  }

  if (results.previous) {
    ordersObj['previous'] = results.previous
  }

  data.forEach((order) => {
    orders[order._id] = order
  })

  ordersObj['orders'] = orders

  if (data) {
    res.json(ordersObj);
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
