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

router.route("/").post(protect, admin, createRun).get(listRuns);

router
  .route("/:id")
  .get(protect, getRunById)
  .put(protect, admin, updateRun)
  .delete(protect, admin, deleteRun);

export default router;
