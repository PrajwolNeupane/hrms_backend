import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Admin } from "../../model/auth";
import errorHanlder from "../../utils/errorHandler";
import { Request, Response } from "express";
import "dotenv/config";
import { createAdminValidation } from "../../type/validations";

export default async function createAdmin(
  req: Request<any, any, any, Record<string, any>>,
  res: Response<any>
) {
  try {
    const { error, value } = createAdminValidation.validate(req.body);

    if (error) {
      errorHanlder({
        res,
        code: 400,
        title: "Create Admin",
        message: error.details[0].message,
      });
      return;
    }

    const existingAdmin = await Admin.findOne({
      email: value.email,
    });

    if (existingAdmin) {
      return errorHanlder({
        res,
        code: 409,
        title: "Create Admin",
        message: "Admin with email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(value.password, salt);

    var admin = new Admin({
      email: value.email,
      password: hashedPassword,
      photo:
        "https://www.kindpng.com/picc/m/475-4750705_school-administrator-icon-png-transparent-png.png",
    });

    admin = await admin.save();

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

    return res.json({
      success: true,
      message: "Admin Account Created",
    });
  } catch (e) {
    return errorHanlder({
      res,
      e,
      code: 500,
      title: "Create Admin",
      message: "Server Error on Creating Admin",
    });
  }
}
