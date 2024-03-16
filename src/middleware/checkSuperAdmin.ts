import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import errorHanlder from "../utils/errorHandler";

export default function checkSuperAdmin(
  req: Request<any>,
  res: Response<any>,
  next: NextFunction
) {
  const superKeyHeader = req.headers["super_key"]; // Get the value of the 'super_key' header

  if (superKeyHeader && superKeyHeader === process.env.SUPER_KEY) {
    // Check if the 'super_key' header exists and matches the value of process.env.SUPER_KEY
    next(); // Proceed to the next middleware
  } else {
    // If the 'super_key' header is missing or doesn't match, send a 403 Forbidden response
    return errorHanlder({
      res,
      code: 403,
      title: "Forbidden",
      message: "User Forbidden",
    });
  }
}
