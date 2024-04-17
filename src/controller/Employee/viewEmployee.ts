import { Request, Response } from "express";
import { Employee } from "../../model/auth";
import errorHanlder from "../../utils/errorHandler";

export default async function viewEmploye(
  req: Request<any, any, any, Record<string, any>>,
  res: Response<any>
) {
  try {
    const employee = await Employee.findOne({
      isDeleted: false,
      _id: req.body.id,
    })
      .select(["-password"])
      .populate("roles")
      .populate("bank");
    res.json({ employee });
  } catch (e) {
    return errorHanlder({
      res,
      e,
      code: 500,
      title: "View Employee",
      message: "Server Error on Getting Employee",
    });
  }
}
