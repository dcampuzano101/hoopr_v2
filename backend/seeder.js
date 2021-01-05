import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import runs from "./data/runs.js";
import User from "./models/userModel.js";
import Run from "./models/runModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const randomUsersForRuns = (createdUsers) => {
  // let count = 0;
  let result = new Set();
  while (result.size <= 10) {
    let randomIndex = Math.floor(
      Math.random() * Math.floor(createdUsers.length)
    );

    let randomUser = createdUsers[randomIndex]._id;
    while (!result.has(randomUser)) {
      result.add(randomUser);
    }
  }
  console.log(result);
  return result;
};

const importData = async () => {
  try {
    await User.deleteMany();
    await Run.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUserId = createdUsers[0]._id;

    console.log(createdUsers);

    const sampleRuns = runs.map((run) => {
      let usersArray = randomUsersForRuns(createdUsers);
      return { ...run, userId: adminUserId, users: [...usersArray] };
    });
    await Run.insertMany(sampleRuns);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
