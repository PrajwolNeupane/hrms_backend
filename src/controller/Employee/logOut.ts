import { Request, Response } from "express";
import errorHanlder from "../../utils/errorHandler";

interface CustomRequest extends Request {
  user?: string; // Define the user property
}

export default async function logOut(req: CustomRequest, res: Response<any>) {
  try {
    if (req.user) {
      res.clearCookie("auth_token");
      res.clearCookie("is_admin");
      return res.json({
        success: true,
        message: "Employee Logout Successfully",
      });
    } else {
      return errorHanlder({
        res,
        code: 403,
        title: "Forbidden",
        message: "User Forbidden",
      });
    }
  } catch (e) {
    return errorHanlder({
      res,
      e,
      code: 500,
      title: "Employee Authetication",
      message: "Server Error on Employee Authetication",
    });
  }
}
