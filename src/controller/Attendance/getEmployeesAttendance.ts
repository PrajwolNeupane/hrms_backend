import { Response, Request } from "express";
import errorHandler from "../../utils/errorHandler";
import { Attendance } from "../../model/attendance";
import timeDifferenceFinder from "../..//utils/timeDifferenceFinder";

export default async function getEmployeesAttendance(
  req: Request<any, any, any, Record<string, any>>,
  res: Response<any>
) {
  const date = req.body.date;
  try {
    const attendance = await Attendance.find({
      createdAt: {
        $gte: new Date(date),
        $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
      },
    }).populate({
      path: "employee_id",
      populate: { path: "roles" }, // Populate the roles field
    });

    const employeesPresent = attendance.reduce((acc, curr) => {
      if (curr.clockIn && curr.clockOut) {
        acc.push({
          employee: curr.employee_id,
          clockIn: curr.clockIn,
          clockOut: curr.clockOut,
          createdAt: curr.createdAt,
          timeDifference: timeDifferenceFinder(curr?.clockIn, curr?.clockOut),
        });
      }
      return acc;
    }, []);

    res.status(200).json(employeesPresent);
  } catch (e) {
    return errorHandler({
      res,
      e,
      code: 500,
      title: "Get attendance employees",
      message: "Server Error on getting employees attendance log",
    });
  }
}
