import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  usersignup,
  homepage,
  usersignin,
  usersignout,
  currentUserInfo,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", homepage);
router.get("/current", isAuthenticated, currentUserInfo);
router.post("/signup", usersignup);
router.post("/login", usersignin);
router.get("/signout", isAuthenticated, usersignout);

export default router;
