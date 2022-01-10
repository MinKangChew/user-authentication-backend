import { Request, Response, NextFunction } from "express";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { omit } from "lodash";
import { JwtPayload } from "jsonwebtoken";

const authorizeUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  if (!accessToken) return next();

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  if (expired && refreshToken) {
    // reissue access token
    const { decoded } = verifyJwt(refreshToken);

    if (!decoded) return next();
    console.log("expired");
    const newAccessToken = signJwt(
      omit(decoded as JwtPayload, ["iat", "exp"]),
      process.env.ACCESS_TOKEN_TTL as string
    );
    res.cookie("access_token", newAccessToken);
    res.locals.user = decoded;
  }
  return next();
};

export default authorizeUser;
