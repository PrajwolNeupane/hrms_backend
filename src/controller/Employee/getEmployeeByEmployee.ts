import { Request, Response } from "express";
import { Employee } from "../../model/auth";
import errorHanlder from "../..//utils/errorHandler";

export default async function getEmployeeByEmployee(
  req: Request<any, any, any, Record<string, any>>,
  res: Response<any>
) {
  try {
    const employee = await Employee.find({ isDeleted: false })
      .select(["-password","-bank","-salary","-pan_number"])
      .populate("roles");
    res.json({ employee });
  } catch (e) {
    return errorHanlder({
      res,
      e,
      code: 500,
      title: "Get Employee",
      message: "Server Error on Getting Employee",
    });
  }
}
