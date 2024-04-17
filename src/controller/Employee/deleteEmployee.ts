import { Request, Response } from "express";
import { Employee } from "../../model/auth";
import errorHanlder from "../..//utils/errorHandler";

export default async function deleteEmployee(
  req: Request<any, any, any, Record<string, any>>,
  res: Response<any>
) {
  try {
    const ids: string[] = req.body.ids;
    ids?.map(async (curr) => {
      await Employee.findOneAndUpdate({ _id: curr }, { isDeleted: true });
    });
    return res.json({
      message: "Employee Deleted",
    });
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
