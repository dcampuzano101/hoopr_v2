import Run from "../models/runModel.js";
import User from "../models/userModel.js";

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


// @description: paginates results from API request 
// @access: public

const paginatedResults = async (model, page, limit) => {
  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const results = {}

  if (endIndex < (await model.countDocuments().exec())) {
    results.next = {
      page: page + 1,
      limit: limit
    }
  } else {
    results.next = {
      page: null,
      limit: null
    }
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    }
  } else {
    results.previous = {
      page: null,
      limit: null
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


// @description: get all runs
// @route: GET /api/runs
// @access: public

const listRuns = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const results = await paginatedResults(Run, page, limit)
  const data = results.results
  
  const runsObj = {};
  const runs = [];

  if (results.next) {
    runsObj['next'] = results.next
  }

  if (results.previous) {
    runsObj['previous'] = results.previous
  }

  data.forEach((run) => {
      runs.push(run)
  })
  runsObj['runs'] = runs
  if (data) {
    res.json(runsObj);
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


// @description: gets all users for specific run
// @route: GET /api/run/:id/users
// @access: protected

const getUsersById = asyncHandler(async (req, res) => {
  debugger;
  // console.log(req.body)
  const userIds = Object.values(req.query)
  const users = await User.find({ _id: userIds }).select("-password");

  // const usersObject = {}
  // debugger;
  // users.forEach((user) => {
  //   usersObject[user._id] = user
  // })
  if (users) {
    res.json(users)
  } else {
    res.status(400)
    throw new Error('Could not fetch users')
  }
})



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
    run.markModified("users");
    const updatedRun = await run.save();

    // initiate stripeRefund
    // send emailCancellationConfirmation

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

export { createRun, listRuns, getRunById, updateRun, deleteRun, getUsersById };
