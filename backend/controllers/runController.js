import Run from "../models/runModel.js";
import asyncHandler from "express-async-handler";
import axios from "axios";

// @description: create run
// @route: POST /api/runs
// @access: admin/private
const createRun = asyncHandler(async (req, res) => {
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.location}&key=${process.env.GOOGLE_MAP_API_KEY}`
  );
  const users = [];

  const geoLocation = {
    lat: data.results[0].geometry.location.lat,
    lng: data.results[0].geometry.location.lng,
  };

  const waitList = [];

  const {
    name,
    location,
    date,
    price,
    capacity,
    startTime,
    endTime,
  } = req.body;

  const run = await Run.create({
    userId: req.user._id,
    name,
    location,
    date,
    price: Number(price),
    capacity: Number(capacity),
    geoLocation,
    users,
    startTime,
    endTime,
    waitList,
  });

  if (run) {
    res.status(201).json({
      userId: run.userId,
      name: run.name,
      location: run.location,
      date: run.date,
      price: run.price,
      capacity: run.capacity,
      users: run.users,
      startTime: run.startTime,
      endTime: run.endTime,
      waitList: run.waitList,
    });
  } else {
    res.status(400);
    throw new Error("Invalid run data");
  }
});

// @description: get all runs
// @route: GET /api/runs
// @access: private
const listRuns = asyncHandler(async (req, res) => {
  const runs = await Run.find({});

  if (runs) {
    res.json(runs);
  } else {
    res.status(404);
    throw new Error("Could not fetch all runs");
  }
});

// @description: get run by id
// @route: GET /api/runs/:id
// @access: private
const getRunById = asyncHandler(async (req, res) => {
  const run = await Run.findById(req.params.id);

  if (run) {
    res.json(run);
  } else {
    res.status(404);
    throw new Error("No run found");
  }
});

// @description: updates run
// @route: PUT /api/runs/:id
// @access: admin/private
const updateRun = asyncHandler(async (req, res) => {
  const run = await Run.findById(req.body.id);
  if (run) {
    run.name = req.body.name || run.name;
    run.location = req.body.location || run.location;
    run.date = req.body.date || run.date;
    run.price = req.body.price || run.price;
    run.capacity = req.body.capacity || run.capacity;
    run.users = req.body.users || run.users;
    run.startTime = req.body.startTime || run.startTime;
    run.endTime = req.body.endTime || run.endTime;
    run.waitList = req.body.waitList || run.waitList;

    const updatedRun = await run.save();
    res.json({
      userId: updatedRun.userId,
      name: updatedRun.name,
      location: updatedRun.location,
      date: updatedRun.date,
      price: updatedRun.price,
      capacity: updatedRun.capacity,
      users: updatedRun.users,
      startTime: updatedRun.startTime,
      endTime: updatedRun.endTime,
      waitList: updatedRun.waitList,
    });
  } else {
    res.status(404);
    throw new Error("Run not found");
  }
});

// @description: deletes run
// @route: PUT /api/runs/:id
// @access: admin/private
const deleteRun = asyncHandler(async (req, res) => {
  const run = await Run.findById(req.params.id);

  if (run) {
    run.remove();
    res.json({ message: "Run removed" });
  } else {
    res.status(404);
    throw new Error("Run not found");
  }
});

export { createRun, listRuns, getRunById, updateRun, deleteRun };
