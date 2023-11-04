import { Router } from "express";
import { register, login, getProfile } from "../controllers/user.controller.js";
import passport from "passport";

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  getProfile
);
export default router;
