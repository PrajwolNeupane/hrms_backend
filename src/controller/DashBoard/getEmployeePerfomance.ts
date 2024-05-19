import { Request, Response } from "express";
import { Employee } from "../../model/auth";
import { Attendance } from "../../model/attendance";
import timeDifferenceFinder from "../../utils/timeDifferenceFinder";
import sumTime from "../../utils/sumTime";
import errorHandler from "../../utils/errorHandler";

interface CustomRequest extends Request {
  user?: string;
  admin?: boolean;
}

interface EmployeePerformanceData {
  first_name: string;
  middle_name: string | null;
  last_name: string;
  photo: string;
  role: string[];
  email: string;
  id: string;
  totalWorkedTime: string;
  totalWorkedTimeThisMonth: string;
  averageWorkedTime: string;
  totalAbsentThisMonth: number;
}

export default async function getEmployeePerfomance(
  req: CustomRequest,
  res: Response<any>
) {
  try {
    const employees = await Employee.find({ isDeleted: false });
    const attendanceRecords = await Attendance.find();
    const employeePerformanceData: EmployeePerformanceData[] = [];

    for (const employee of employees) {
      const employeeAttendance = attendanceRecords.filter(
        (record) => record.employee_id.toString() === employee._id.toString()
      );

      const totalWorkedTime = employeeAttendance.reduce((totalTime, record) => {
        if (record.clockOut) {
          const workedTime = timeDifferenceFinder(
            record.clockIn,
            record.clockOut
          );
          return sumTime(totalTime, workedTime);
        }
        return totalTime;
      }, "00:00");

      const totalWorkedTimeThisMonth = employeeAttendance
        .filter((record) => {
          const recordDate = new Date(record.createdAt);
          const currentMonth = new Date().getMonth();
          const currentYear = new Date().getFullYear();
          return (
            recordDate.getMonth() === currentMonth &&
            recordDate.getFullYear() === currentYear
          );
        })
        .reduce((totalTime, record) => {
          if (record.clockOut) {
            const workedTime = timeDifferenceFinder(
              record.clockIn,
              record.clockOut
            );
            return sumTime(totalTime, workedTime);
          }
          return totalTime;
        }, "00:00");

      const [totalWorkedHours, totalWorkedMinutes] = totalWorkedTime
        .split(":")
        .map(Number);
      const totalWorkedTimeInMinutes =
        totalWorkedHours * 60 + totalWorkedMinutes;

      const averageWorkedTime =
        employeeAttendance.length > 0
          ? convertMinutesToTimeString(
              totalWorkedTimeInMinutes / employeeAttendance.length
            )
          : "00:00";

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const currentDate = new Date().getDate();
      const expectedWorkingDays =
        Math.floor((currentDate * 5) / 7) +
        (currentDate % 7 > 0 ? (currentDate % 7 < 6 ? 1 : 0) : 0); // Assuming 5 working days per week

      const uniqueDates = new Set();

      employeeAttendance.filter((record) => {
        const recordDate = new Date(record.createdAt);
        if (
          recordDate.getMonth() === currentMonth &&
          recordDate.getFullYear() === currentYear &&
          recordDate.getDate() <= new Date().getDate()
        ) {
          const dateString = recordDate.toDateString();
          uniqueDates.add(dateString);
        }
      });

      const totalAbsentThisMonth = expectedWorkingDays - uniqueDates.size;

      employeePerformanceData.push({
        first_name: employee.first_name,
        middle_name: employee.middle_name,
        last_name: employee.last_name,
        photo: employee.photo,
        role: employee.roles.map((role) => role.toString()),
        email: employee.email,
        id: employee._id.toString(),
        totalWorkedTime,
        totalWorkedTimeThisMonth,
        averageWorkedTime,
        totalAbsentThisMonth,
      });
    }

    return res.json(employeePerformanceData);
  } catch (e) {
    return errorHandler({
      res,
      e,
      code: 500,
      title: "Getting Employee Performance Data",
      message: "Server Error on Getting Employee Performance",
    });
  }
}

function convertMinutesToTimeString(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${remainingMinutes
    .toString()
    .padStart(2, "0")}`;
}
