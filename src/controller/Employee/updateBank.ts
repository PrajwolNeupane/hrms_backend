import { Request, Response } from "express";
import errorHandler from "../../utils/errorHandler";
import { Employee } from "../../model/auth";
import { Bank } from "../../model/bank";

interface CustomRequest extends Request {
  user?: string;
  body: {
    bankName?: string;
    bankBranch?: string;
    bankAccountNumber?: string;
  };
}

export default async function updateBank(
  req: CustomRequest,
  res: Response<any>
) {
  try {
    const { bankName, bankBranch, bankAccountNumber } = req.body;

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

    // Find the employee's existing bank information
    const existingBank = employee.bank;

    // Create a new bank object or update the existing one
    const bank = existingBank
      ? await Bank.findByIdAndUpdate(
          existingBank._id,
          {
            name: bankName,
            branch: bankBranch,
            account_number: bankAccountNumber,
          },
          { new: true }
        )
      : await Bank.create({
          name: bankName,
          branch: bankBranch,
          account_number: bankAccountNumber,
        });

    // Update the employee's bank reference
    employee.bank = bank._id;

    // Save the updated employee information
    const updatedEmployee = await employee.save();

    return res.json({
      success: true,
      message: "Employee bank information updated successfully",
      employee: updatedEmployee,
    });
  } catch (e) {
    return errorHandler({
      res,
      e,
      code: 500,
      title: "Employee",
      message: "Server Error on Employee Bank Information Update",
    });
  }
}
