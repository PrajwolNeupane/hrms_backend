import "dotenv/config";
import { Request, Response } from "express";
import errorHanlder from "../../utils/errorHandler";
import tokenGenerator from "../../utils/tokenGenerator";
import { Admin, Employee, Token } from "../../model/auth";
import forgetPasswordMailSender from "../..//utils/forgetPasswordMailSender";
import forgotPasswordTemplate from "../../conts/forgetPasswordTemplate";

export default async function forgetPassword(
  req: Request<any, any, any, Record<string, any>>,
  res: Response<any>
) {
  try {
    if (req.body.email) {
      const employee = await Employee.findOne({ email: req.body.email });
      const admin = await Admin.findOne({ email: req.body.email });
      if (employee || admin) {
        const generatedToken = tokenGenerator().toString();
        const expireDate = new Date();
        expireDate.setMinutes(expireDate.getMinutes() + 1);
        var token = new Token({
          token: `${generatedToken}`,
          expire_date: expireDate.toISOString(),
          valid_email: req.body.email,
        });
        await token.save();

        forgetPasswordMailSender({
          email: req.body.email,
          template: forgotPasswordTemplate,
          token: generatedToken,
        });

        return res.json({
          success: true,
          message: "Forget Password Token Sent",
        });
      } else {
        return errorHanlder({
          res,
          code: 401,
          title: "Email is not found",
          message: "Invalid Email",
        });
      }
    } else {
      return errorHanlder({
        res,
        code: 500,
        title: "Email is needed",
        message: "Server Error on Employee Authetication",
      });
    }
  } catch (e) {
    return errorHanlder({
      res,
      e,
      code: 500,
      title: "Employee Authetication",
      message: "Server Error on Employee Authetication",
    });
  }
}
