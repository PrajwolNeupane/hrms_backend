import bcrypt from "bcrypt";
import { Employee } from "../../model/auth";
import errorHanlder from "../../utils/errorHandler";
import { Request, Response } from "express";
import Role from "../../model/role/Role";
import generateRandomPassword from "../../utils/generatePassword";
import mailSender from "../../utils/mailSender";
import credientalsTemplate from "../../conts/credientalsTemplate";
import "dotenv/config";
import generateAvatarUrl from "../../utils/avatarGenerator";
import { createEmployeeValidation } from "../../type/validations";

export default async function createEmployee(
  req: Request<any, any, any, Record<string, any>>,
  res: Response<any>
) {
  const { error, value } = createEmployeeValidation.validate(req.body);

  if (error) {
    errorHanlder({
      res,
      code: 400,
      title: "Create Employee",
      message: error.details[0].message,
    });
    return;
  }

  try {
    if (value.email) {
      const existingEmployee = await Employee.findOne({
        email: value.email,
      });
      if (existingEmployee) {
        return errorHanlder({
          res,
          code: 409,
          title: "Create Employee",
          message: "Employee with email already exists",
        });
      }

      const generatedPassword = generateRandomPassword(10);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(generatedPassword, salt);

      // Create the Role
      const role = new Role({
        name: value.role,
        date_joined: value.date_joined,
      });

      // Save the Role
      const savedRole = await role.save();

      // Create the Employee
      const employee = new Employee({
        email: value.email,
        first_name: value.first_name,
        middle_name: value.middle_name || null, // Use value.middle_name if it exists, otherwise use null
        last_name: value.last_name,
        phone: value.phone || null, // Use value.phone if it exists, otherwise use null
        gender: value.gender,
        password: hashedPassword,
        photo: generateAvatarUrl(value.first_name, value.last_name), // Use value.first_name and value.last_name
        dob: value.dob,
        address: value.address,
        salary: 0,
        pan_number: "",
        date_joined: value.date_joined,
        roles: [savedRole._id], // Assign the saved Role's _id
        isDeleted: false,
      });

      // Save the Employee
      await employee.save();

      // Send mail with credentials
      mailSender({
        email: req.body.email,
        password: generatedPassword,
        template: credientalsTemplate,
      });

      return res.json({
        success: true,
        message: "Employee Account Created",
      });
    }
  } catch (e) {
    return errorHanlder({
      res,
      e,
      code: 500,
      title: "Create Employee",
      message: "Server Error on Creating Employee",
    });
  }
}
