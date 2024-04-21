import { Request, Response } from "express";
import { Admin } from "../../model/auth";
import { changePasswordValidation } from "../../type/validations";
import errorHandler from "../../utils/errorHandler";
import bcrypt from "bcrypt";

interface CustomRequest extends Request {
  user?: string; // Define the user property
}

export default async function changePassword(
  req: CustomRequest,
  res: Response<any>
) {
  const { error, value } = changePasswordValidation.validate(req.body);

  if (error) {
    return errorHandler({
      res,
      code: 400,
      title: "Change Password",
      message: error.details[0].message,
    });
  }

  try {
    const admin = await Admin.findById(req.user);
    if (!admin) {
      return errorHandler({
        res,
        code: 404,
        title: "Change Password",
        message: "Admin not found",
      });
    }

    const { currentPassword, newPassword } = value;

    const isValidPassword = await bcrypt.compare(
      currentPassword,
      admin.password
    );

    if (!isValidPassword) {
      return errorHandler({
        res,
        code: 401,
        title: "Change Password",
        message: "Invalid current password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    admin.password = hashedPassword;
    await admin.save();

    res.json({
      title: "Change Password",
      message: "Password changed successfully",
    });
  } catch (e) {
    return errorHandler({
      res,
      e,
      code: 500,
      title: "Change Password",
      message: "Server Error on Changing Password",
    });
  }
}
