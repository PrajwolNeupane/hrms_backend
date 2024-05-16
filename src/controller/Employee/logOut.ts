import { Request, Response } from "express";
import errorHanlder from "../../utils/errorHandler";

interface CustomRequest extends Request {
  user?: string;
  cookies: { [key: string]: string };
}

export default async function logOut(req: CustomRequest, res: Response<any>) {
  try {
    if (req.user) {
      // Clear the auth_token cookie
      res.clearCookie("auth_token", {
        httpOnly: true,
        sameSite: "none", // Change to 'none' if served over HTTPS
        secure: true, // Only set this if served over HTTPS
      });

      // Clear other cookies if needed
      // const cookies = { ...req.cookies };
      // for (const cookieName in cookies) {
      //   res.clearCookie(cookieName);
      // }

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
