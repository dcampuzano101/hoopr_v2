import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createRun,
  listRuns,
  getRunById,
  updateRun,
  deleteRun,
} from "../controllers/runController.js";

router.route("/").get(listRuns);

router.route("/create").post(protect, admin, createRun);

router
  .route("/:id")
  .get(protect, getRunById)
  .put(protect, updateRun)
  .delete(protect, admin, deleteRun);

export default router;
