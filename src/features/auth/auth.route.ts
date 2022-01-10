import express from "express";
import loginRequired from "../../middlewares/loginRequired";
import validate from "../../middlewares/validateResource";
import { createUserSchema } from "../user/user.schema";
import {
  loginHandler,
  logoutHandler,
  profileHandler,
  registerUserHandler,
} from "./auth.controller";

const router = express.Router();

router.route("/register").post(validate(createUserSchema), registerUserHandler);
router.route("/login").post(loginHandler);
router.route("/profile").get(loginRequired, profileHandler);
router.route("/logout").get(logoutHandler);

const authRoute = router;
export default authRoute;
