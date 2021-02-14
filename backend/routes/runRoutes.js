import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createRun,
  listRuns,
  getRunById,
  updateRun,
  deleteRun,
  getUsersById
} from "../controllers/runController.js";



router.route("/").get(listRuns);

router.route("/create").post(protect, admin, createRun);

router
  .route("/:id")
  .get(getRunById)
  .put(protect, updateRun)
  .delete(protect, admin, deleteRun);

router.route("/:id/users").get(getUsersById)

export default router;
