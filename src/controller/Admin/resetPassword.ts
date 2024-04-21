import "dotenv/config";
import { Request, Response } from "express";
import errorHandler from "../../utils/errorHandler";
import { Admin, Token } from "../../model/auth";
import bcrypt from "bcrypt";

export default async function resetPassword(
  req: Request<any, any, any, Record<string, any>>,
  res: Response<any>
) {
  try {
    const { token, password } = req.body;

    if (!token) {
      return errorHandler({
        res,
        code: 400,
        title: "Token",
        message: "Token is required",
      });
    }

    if (!password) {
      return errorHandler({
        res,
        code: 400,
        title: "Password",
        message: "New Password is required",
      });
    }

    const currentDateTime = new Date();

    // Delete tokens that have expired
    await Token.deleteMany({
      expire_date: { $lt: currentDateTime.toISOString() },
    });

    const foundToken = await Token.findOne({ token });

    if (!foundToken) {
      return errorHandler({
        res,
        code: 404,
        title: "Token",
        message: "Token not found",
      });
    }
    const tokenExpiryDate = new Date(foundToken.expire_date);
    if (currentDateTime > tokenExpiryDate) {
      return errorHandler({
        res,
        code: 401,
        title: "Token",
        message: "Token has expired",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    var employee = await Admin.findOne({ email: foundToken.valid_email });
    if (employee) {
      employee.password = hashedPassword;
      await employee.save();
    }

    await foundToken.deleteOne();

    // If token is valid and not expired
    res.json({
      title: "Password Reset",
      message: "Password Reset Successfull",
    });
  } catch (error) {
    return errorHandler({
      res,
      e: error,
      code: 500,
      title: "Server Error",
      message: "An error occurred while processing the request",
    });
  }
}
