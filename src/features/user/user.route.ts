import express from "express";
import { getAllUsersHandler } from "./user.controller";

const router = express.Router();

router.route("/").get(getAllUsersHandler);

const userRoute = router;
export default userRoute;
