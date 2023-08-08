import express from "express";
import {
  authUser,
  getUserProfile,
  logOutUser,
  registerUser,
  updateUserProfile,
} from "../controller/userController.js";
import { protectRoute } from "../middlewares/authMiddlewere.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/auth", authUser);
router.post("/logout", logOutUser);
router
  .route("/profile")
  .get(protectRoute, getUserProfile)
  .put(protectRoute, updateUserProfile);

export default router;
