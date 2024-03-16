import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import "dotenv/config";
import { Request, Response } from "express";
import errorHanlder from "../../utils/errorHandler";
import { logInEmployeeValidation } from "../../type/validations";
import { Admin } from "../../model/auth";

export default async function logIn(
  req: Request<any, any, any, Record<string, any>>,
  res: Response<any>
) {
  const { error, value } = logInEmployeeValidation.validate(req.body);

  if (error) {
    errorHanlder({
      res,
      code: 400,
      title: "Admin LogIn",
      message: error.details[0].message,
    });
    return;
  }

  try {
    const admin = await Admin.findOne({
      email: value.email,
    });
    if (!admin) {
      return errorHanlder({
        res,
        code: 401,
        title: "Login Admin",
        message: "Invalid Admin Credentials",
      });
    }
    const validPassword = await bcrypt.compare(value.password, admin.password);
    if (!validPassword) {
      return errorHanlder({
        res,
        code: 401,
        title: "Login Admin",
        message: "Invalid Admin Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_TOKEN as string
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      sameSite: false,
      secure: true,
    });

    res.cookie("is_admin", true, {
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
      title: "Admin Login",
      message: "Server Error on Logging Employee",
    });
  }
}
