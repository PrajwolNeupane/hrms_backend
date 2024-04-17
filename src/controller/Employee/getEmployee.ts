import { Request, Response } from "express";
import { Employee } from "../../model/auth";
import errorHanlder from "../..//utils/errorHandler";

export default async function getEmployee(
  req: Request<any, any, any, Record<string, any>>,
  res: Response<any>
) {
  try {
    const employee = await Employee.find({ isDeleted: false })
      .select(["-password"])
      .populate("roles")
      .populate("bank");
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
