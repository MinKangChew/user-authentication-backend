import express from "express";
import loginRequired from "../../middlewares/loginRequired";
import { getAllUsersHandler } from "./user.controller";

const router = express.Router();

router.route("/").get(loginRequired, getAllUsersHandler);

const userRoute = router;
export default userRoute;
