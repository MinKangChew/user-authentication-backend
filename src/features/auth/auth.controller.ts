import { Request, Response, NextFunction } from "express";
import catchAsyncError from "../../middlewares/catchAsyncErrors";
import ErrorHandler from "../../utils/errorHandler";
import { signJwt } from "../../utils/jwt.utils";
import {
  createUser,
  findUserByEmail,
  findUserByUsername,
} from "../user/user.service";
import { hashPassword, validatePassword } from "./auth.service";

export const registerUserHandler = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, email } = req.body;
    let userExist = await findUserByUsername(username);

    if (userExist)
      return next(new ErrorHandler(`Username ${username} already exist`, 400));

    userExist = await findUserByEmail(email);

    if (userExist)
      return next(new ErrorHandler(`Email ${email} already exist`, 400));

    // hash password
    const hash = await hashPassword(password);

    const user = await createUser({
      ...req.body,
      password: hash,
    });

    res.status(200).json({
      success: true,
      results: user,
    });
  }
);

export const loginHandler = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const user = await validatePassword({ username, password });

    if (!user)
      return next(new ErrorHandler(`Invalid username or password`, 401));

    // Create an access token
    const accessToken = signJwt(user, process.env.ACCESS_TOKEN_TTL as string);

    // Create refresh token
    const refreshToken = signJwt(user, process.env.REFRESH_TOKEN_TTL as string);

    res.cookie("access_token", accessToken);
    res.cookie("refresh_token", refreshToken);
    res.locals.user = user;
    res.redirect("/auth/profile");
  }
);

export const profileHandler = (req: Request, res: Response) => {
  const user = res.locals.user;
  res.status(200).json({
    success: true,
    results: user,
  });
};

export const logoutHandler = (req: Request, res: Response) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.redirect("/");
};
