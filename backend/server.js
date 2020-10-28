import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import passport from "passport";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import runRoutes from "./routes/runRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import googleStrategy from "./passportSetup.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.use(passport.initialize());
googleStrategy(passport);
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/runs", runRoutes);
app.use("/api/orders", orderRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
