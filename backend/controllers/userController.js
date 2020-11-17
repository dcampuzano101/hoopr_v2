import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @description: registers user
// @route: POST /api/users
// @access: public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    if (userExists.username === username) {
      res.status(400);
      throw new Error("Choose new username, already exists");
    }
    res.status(400);
    throw new Error("User already exists");
  }

  //using Mongoose.model.pre('save') to encrypt in userModel.js
  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @description: authenticates user
// @route: POST /api/users/login
// @access: public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email / password combination");
  }
});

const googleAuthUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const user = await User.findById(id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Could not authenticate through google");
  }
});

// @description: gets current user profile
// @route: GET /api/users/profile
// @access: private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      profilePhoto: user.profilePhoto,
      token: generateToken(user._id),
      runs: user.runs,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @description: updates current user's profile
// @route: PUT /api/users/profile
// @access: private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.profilePhoto = req.body.profilePhoto || user.profilePhoto;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      profilePhoto: updatedUser.profilePhoto,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @description: gets all users
// @route: GET /api/users
// @access: admin/private

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  //maybe just res.json(users)
  const userObj = {};

  users.forEach((user) => {
    userObj[user._id] = user;
  });
  debugger;
  if (users) {
    res.json(userObj);
  } else {
    res.status(400);
    throw new Error("Could not fetch users");
  }
});

// @description: get user by id
// @route: GET /api/users/:id
// @access: admin/private
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @description: updates user
// @route: PUT /api/users/:id
// @access: admin/private
const updateUser = asyncHandler(async (req, res) => {
  //main difference between updateUserProfile vs updateUser (req.params.id vs. req.user._id [currentUser])
  const user = await User.findById(req.body.id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    const updatedUser = user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @description: deletes user
// @route: DELETE /api/users/:id
// @access: admin/private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error();
  }
});

export {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  googleAuthUser,
};
