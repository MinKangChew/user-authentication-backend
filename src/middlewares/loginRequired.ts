import { Request, Response, NextFunction } from "express";

const loginRequired = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  if (!user)
    return res.status(403).json({
      success: false,
      message: "Forbidden: Please login",
    });
  return next();
};

export default loginRequired;
