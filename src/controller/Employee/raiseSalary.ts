import { Request, Response } from "express";
import { Employee } from "../../model/auth";
import errorHandler from "../../utils/errorHandler";

export default async function raiseSalary(
  req: Request<any, any, any, Record<string, any>>,
  res: Response<any>
) {
  try {
    const { id, salary } = req.body;

    // Find the employee by ID
    const employee = await Employee.findById(id);

    if (!employee) {
      return errorHandler({
        res,
        code: 404,
        title: "Employee Not Found",
        message: "Employee with the provided ID not found",
      });
    }

    // Update the employee's salary
    employee.salary = employee.salary + parseInt(salary, 10);
    await employee.save();

    res.status(200).json({
      success: true,
      message: "Employee salary updated successfully",
      data: employee,
    });
  } catch (e) {
    return errorHandler({
      res,
      e,
      code: 500,
      title: "Employee Salary Update",
      message: "Server Error on Employee Salary Update",
    });
  }
}
