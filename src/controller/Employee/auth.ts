import { Request, Response } from "express";
import errorHanlder from "../../utils/errorHandler";
import { Admin, Employee } from "../../model/auth";

interface CustomRequest extends Request {
  user?: string; // Define the user property
  admin?: boolean;
}

export default async function auth(req: CustomRequest, res: Response<any>) {
  try {
    if ((req.user && !req.admin) || (req.user && req.admin == undefined)) {
      var employee = await Employee.findById(req.user)
        .select(["-password"])
        .populate("roles", "-__v");
      return res.json({
        succes: true,
        message: "Employee Logged In",
        employee,
      });
    } else if (req.user && req.admin) {
      var admin = await Admin.findById(req.user).select(["-password"]);
      return res.json({
        succes: true,
        message: "Employee Logged In",
        employee: admin,
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
