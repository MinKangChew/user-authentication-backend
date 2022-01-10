import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error";
import authorizeUser from "./middlewares/authorizeUser";
import authRoute from "./features/auth/auth.route";
import userRoute from "./features/user/user.route";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
dotenv.config();

app.use(
  session({
    secret: process.env.CLIENT_SECRET_EXPRESS as string,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(authorizeUser);

// Routes;
app.get("/", (req, res) => {
  res.json({ message: "Home Page" });
});
app.use("/auth", authRoute);
app.use("/users", userRoute);

// Middlewares
app.use(errorMiddleware);

export default app;
