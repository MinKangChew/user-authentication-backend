import express from "express";
import {
  loginHandler,
  logoutHandler,
  profileHandler,
  registerUserHandler,
} from "./auth.controller";

const router = express.Router();

router.route("/register").post(registerUserHandler);
router.route("/login").post(loginHandler);
router.route("/profile").get(profileHandler);
router.route("logout").get(logoutHandler);

const authRoute = router;
export default authRoute;
