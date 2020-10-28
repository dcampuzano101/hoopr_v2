import express from "express";
const router = express.Router();
import passport from "passport";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

router.route("/google").get(async (req, res) => {
  debugger;
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
});

// @desc    Google auth callback
// @route   GET /auth/google/callback
router
  .route("/google/callback")
  .get(
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
      res.redirect("http://localhost:3000");
    }
  );
router.route("/").post(registerUser).get(protect, admin, getUsers);

router.route("/login").post(authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

// @desc    Auth with Google
// @route   GET /auth/google

export default router;
