import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import "dotenv/config";
import { Request, Response } from "express";
import errorHanlder from "../../utils/errorHandler";
import { logInEmployeeValidation } from "../../type/validations";
import { Employee } from "../../model/auth";

export default async function logIn(
  req: Request<any, any, any, Record<string, any>>,
  res: Response<any>
) {
  const { error, value } = logInEmployeeValidation.validate(req.body);

  if (error) {
    errorHanlder({
      res,
      code: 400,
      title: "LogIn Employee",
      message: error.details[0].message,
    });
    return;
  }

  try {
    const employee = await Employee.findOne({
      email: value.email,
    });
    if (!employee) {
      return errorHanlder({
        res,
        code: 401,
        title: "Employee Login",
        message: "Invalid Employee Credentials",
      });
    }
    const validPassword = await bcrypt.compare(
      value.password,
      employee.password
    );
    if (!validPassword) {
      return errorHanlder({
        res,
        code: 401,
        title: "Employee Login",
        message: "Invalid Employee Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: employee._id,
      },
      process.env.JWT_TOKEN as string
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      sameSite: false,
      secure: true,
    });

    res.json({
      success: true,
      message: "Log In Successfully",
    });
  } catch (e) {
    return errorHanlder({
      res,
      e,
      code: 500,
      title: "Login Employee",
      message: "Server Error on Logging Employee",
    });
  }
}
