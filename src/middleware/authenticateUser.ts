import "dotenv/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import errorHanlder from "../utils/errorHandler";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: string; // Define the user property
  admin?: boolean;
}

export default function authenticateUser(
  req: CustomRequest,
  res: Response<any>,
  next: NextFunction
) {
  if (req.cookies.auth_token && !req.cookies.is_admin) {
    try {
      const decoded = jwt.verify(
        req.cookies.auth_token,
        process.env.JWT_TOKEN as string
      ) as JwtPayload;
      req.user = decoded?.id as string;
      req.admin = false;
      next();
    } catch (e) {
      return errorHanlder({
        res,
        code: 403,
        e,
        title: "Invalid Auth Token",
        message: "Invalid Auth Token",
      });
    }
  } else if (req.cookies.auth_token && req.cookies.is_admin) {
    try {
      const decoded = jwt.verify(
        req.cookies.auth_token,
        process.env.JWT_TOKEN as string
      ) as JwtPayload;
      req.user = decoded?.id as string;
      req.admin = true;
      next();
    } catch (e) {
      return errorHanlder({
        res,
        code: 403,
        e,
        title: "Invalid Auth Token",
        message: "Invalid Auth Token",
      });
    }
  } else {
    return errorHanlder({
      res,
      code: 403,
      title: "Forbidden",
      message: "User Forbidden",
    });
  }
}
