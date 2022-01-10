import { Request, Response } from "express";
import catchAsyncError from "../../middlewares/catchAsyncErrors";
import { getAllUsers } from "./user.service";

export const getAllUsersHandler = catchAsyncError(
  async (req: Request, res: Response) => {
    const users = await getAllUsers();

    res.status(200).json({
      success: true,
      results: users,
    });
  }
);
