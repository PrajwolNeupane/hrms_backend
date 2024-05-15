import { Request, Response } from "express";
import errorHanlder from "../../utils/errorHandler";

interface CustomRequest extends Request {
  user?: string; // Define the user property
  cookies: { [key: string]: string }; // Define the cookies property
}

export default async function logOut(req: CustomRequest, res: Response<any>) {
  try {
    if (req.user) {
      // Clear cookies
      const cookies = { ...req.cookies }; // Create a copy of the cookies object
      for (const cookieName in cookies) {
        // Clear each cookie by setting it to an expired value
        res.cookie(cookieName, "", { expires: new Date(0) });
      }

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
