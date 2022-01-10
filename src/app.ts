import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import errorMiddleware from "./middlewares/error";
import cookieParser from "cookie-parser";
import authorizeUser from "./middlewares/authorizeUser";

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
  res.json({ message: "API Service is Running" });
});
// app.use("/auth", authRoute);

// Middlewares
app.use(errorMiddleware);

export default app;
