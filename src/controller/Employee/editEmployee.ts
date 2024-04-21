import { Request, Response } from "express";
import { createEmployeeValidation } from "../../type/validations";
import { Employee } from "../../model/auth";
import errorHanlder from "../../utils/errorHandler";

export default async function editEmlpoyee(
  req: Request<any, any, any, Record<string, any>>,
  res: Response<any>
) {
  const { error, value } = createEmployeeValidation.validate(req.body);
  if (error) {
    errorHanlder({
      res,
      code: 400,
      title: "Edit Employee",
      message: error.details[0].message,
    });
    return;
  }
  try {
    await Employee.findOneAndUpdate({ email: value.email }, { ...value });

    return res.json({
      success: true,
      message: "Employee Edited",
    });
  } catch (e) {
    return errorHanlder({
      res,
      e,
      code: 500,
      title: "Edit Employee",
      message: "Server Error on Editing Employee",
    });
  }
}
