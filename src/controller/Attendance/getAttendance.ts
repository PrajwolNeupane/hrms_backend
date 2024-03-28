import { Request, Response } from "express";
import { Employee } from "../../model/auth";
import { Attendance } from "../../model/attendance";
import timeDifferenceFinder from "../../utils/timeDifferenceFinder";
import sumTime from "../../utils/sumTime";

interface CustomRequest extends Request {
  user?: string; // Define the user property
  admin?: boolean;
}

export default async function getAttendance(
  req: CustomRequest,
  res: Response<any>
) {
  var employee = await Employee.findById(req.user);
  var attendance = await Attendance.find({ employee_id: req.user });
  var totalTime = "00:00";
  var timeDiff = [""];
  if (attendance) {
    attendance.map((curr, indx) => {
      if (curr.clockOut) {
        const diff = timeDifferenceFinder(curr.clockIn, curr.clockOut);
        timeDiff.push(diff);
        totalTime = sumTime(totalTime, diff);
      }
    });
  }
  return res.json({
    employee,
    totalTime,
    timeDiff,
  });
}
