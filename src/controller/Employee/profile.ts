import { Request, Response } from "express";
import errorHanlder from "../../utils/errorHandler";
import { Employee } from "../../model/auth";

interface CustomRequest extends Request {
  user?: string; // Define the user property
}

export default async function profile(req: CustomRequest, res: Response<any>) {
  try {
    var employee = await Employee.findById(req.user)
      .select(["-password"])
      .populate("roles", "-__v")
      .populate("bank", "-__v");
    return res.json({
      succes: true,
      message: "Employee Logged In",
      employee,
    });
  } catch (e) {
    return errorHanlder({
      res,
      e,
      code: 500,
      title: "Employee ",
      message: "Server Error on Employee Profile",
    });
  }
}
