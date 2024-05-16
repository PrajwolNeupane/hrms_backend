import { Request, Response } from "express";
import errorHandler from "../../utils/errorHandler";
import { Employee } from "../../model/auth";

interface CustomRequest extends Request {
  user?: string; // Define the user property
  body: {
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    phone?: string;
    pan_number?: string;
  };
}

export default async function updateProfile(
  req: CustomRequest,
  res: Response<any>
) {
  try {
    const { first_name, middle_name, last_name, phone, pan_number } = req.body;

    // Find the employee by the provided user ID
    const employee = await Employee.findById(req.user)
      .select(["-password"])
      .populate("roles", "-__v")
      .populate("bank", "-__v");

    if (!employee) {
      return errorHandler({
        res,
        code: 404,
        title: "Employee Not Found",
        message: "Employee not found in the database.",
      });
    }

    // Update the employee's information with the provided values
    employee.first_name = first_name || employee.first_name;
    employee.middle_name = middle_name;
    employee.last_name = last_name || employee.last_name;
    employee.phone = phone || employee.phone;
    employee.pan_number = pan_number || employee.pan_number;

    // Save the updated employee information
    const updatedEmployee = await employee.save();

    return res.json({
      success: true,
      message: "Employee profile updated successfully",
      employee: updatedEmployee,
    });
  } catch (e) {
    return errorHandler({
      res,
      e,
      code: 500,
      title: "Employee",
      message: "Server Error on Employee Profile Update",
    });
  }
}
