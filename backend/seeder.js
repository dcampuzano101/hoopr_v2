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

const importData = async () => {
  try {
    await User.deleteMany();
    await Run.deleteMany();

    const createdUsers = await User.insertMany(users);

    //adminUser = createdUsers[0]._id
    //re-watch video to create Products on MERN course
    const adminUserId = createdUsers[0]._id;

    const sampleRuns = runs.map((run) => {
      return { ...run, userId: adminUserId };
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
