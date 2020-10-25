import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import userRoutes from "./routes/userRoutes.js";

import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
// import runRoutes from "./routes/runRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(notFound);
app.use(errorHandler);

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
