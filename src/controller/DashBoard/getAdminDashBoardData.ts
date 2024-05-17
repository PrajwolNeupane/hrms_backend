import { Request, Response } from "express";
import errorHandler from "../../utils/errorHandler";
import { Employee } from "../../model/auth";
import { Attendance } from "../../model/attendance";
import timeDifferenceFinder from "../../utils/timeDifferenceFinder";
import sumTime from "../../utils/sumTime";

// Function to extract hours from a time string (format: "hh:mm")
const extractHours = (timeString: string): number => {
  const [hours] = timeString.split(":").map(Number);
  return hours;
};

interface EmployeeAttendedPerDayType {
  [date: number]: Set<string>;
}

export default async function getAdminDashBoardData(
  req: Request,
  res: Response<any>
) {
  try {
    const employees = await Employee.find({ isDeleted: false });
    const employeeCount = employees.length;

    // Get the start and end of the current day
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Count the distinct employees present today
    const employeesPresentToday = (
      await Attendance.distinct("employee_id", {
        createdAt: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      })
    ).length;

    const employeesAbsentToday = employeeCount - employeesPresentToday;

    // Initialize arrays to hold employee creation counts, attendance, and work hours for each day of the month
    const employeeCreated = new Array(12).fill(0);
    const numberOfDaysInMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate();
    const employeeAttendance = new Array(numberOfDaysInMonth).fill(0);
    const employeeWorkHour = new Array(numberOfDaysInMonth).fill("00:00");

    // Count employees created in each month
    employees.forEach((employee) => {
      const creationMonth = new Date(employee.date_joined).getMonth();
      employeeCreated[creationMonth]++;
    });

    // Initialize an object to store the set of employee IDs present on each day
    const employeeAttendedPerDay: EmployeeAttendedPerDayType = {};

    // Iterate through attendance records to count employees present for each date and calculate work hours
    const attendanceRecords = await Attendance.find({
      createdAt: {
        $gte: new Date().setDate(1),
        $lte: new Date().setDate(numberOfDaysInMonth),
      },
    });

    const employeesAttendedToday = new Set();

    attendanceRecords.forEach((record) => {
      const attendanceDate = new Date(record.createdAt).getDate();

      // Initialize the set for the current day if it doesn't exist
      if (!employeeAttendedPerDay[attendanceDate]) {
        employeeAttendedPerDay[attendanceDate] = new Set();
      }

      const employeeIdString = record.employee_id.toString();

      // If the employee ID is not already in the set for this day
      if (!employeeAttendedPerDay[attendanceDate].has(employeeIdString)) {
        employeeAttendedPerDay[attendanceDate].add(employeeIdString);
        employeeAttendance[attendanceDate - 1]++;
      }

      employeesAttendedToday.add(record.employee_id);


      if (record.clockOut) {
        const diff = timeDifferenceFinder(record.clockIn, record.clockOut);
        const totalHoursWorkedForDay = sumTime(
          employeeWorkHour[attendanceDate - 1],
          diff
        );
        employeeWorkHour[attendanceDate - 1] = totalHoursWorkedForDay;
      }
    });

    // Get the total hours worked for each employee this week
    const totalHoursPromises = employees.map(async (curr) => {
      const startOfWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 * 7);
      const endOfWeek = new Date(Date.now());

      const attendance = await Attendance.find({
        employee_id: curr._id,
        createdAt: {
          $gte: startOfWeek,
          $lt: endOfWeek,
        },
      });

      let totalHoursWorkedForEmployee = "00:00";

      attendance.forEach((att) => {
        if (att.clockOut) {
          const diff = timeDifferenceFinder(att.clockIn, att.clockOut);
          totalHoursWorkedForEmployee = sumTime(
            totalHoursWorkedForEmployee,
            diff
          );
        }
      });

      return totalHoursWorkedForEmployee;
    });

    // Wait for all the promises to resolve
    const totalHoursWorkedThisWeekArray = await Promise.all(totalHoursPromises);

    // Sum up the total hours worked for all employees
    let totalHoursWorkedThisWeek = "00:00";
    totalHoursWorkedThisWeekArray.forEach((hours) => {
      totalHoursWorkedThisWeek = sumTime(totalHoursWorkedThisWeek, hours);
    });

    // Convert totalHoursWorkedThisWeek to a number of hours
    const [hoursStr, minutesStr] = totalHoursWorkedThisWeek.split(":");
    const totalHoursWorkedThisWeekInHours =
      parseInt(hoursStr, 10) + parseInt(minutesStr, 10) / 60;

    // Calculate the remaining hours and minutes
    let totalHoursThisWeek = Math.floor(totalHoursWorkedThisWeekInHours);
    let totalMinutesThisWeek = Math.round(
      (totalHoursWorkedThisWeekInHours - totalHoursThisWeek) * 60
    );

    // If minutes are negative, add 60 and subtract 1 from hours
    if (totalMinutesThisWeek < 0) {
      totalMinutesThisWeek += 60;
      totalHoursThisWeek -= 1;
    }

    // Extract only the hours portion from each day's work hours
    const employeeWorkHourHours = employeeWorkHour.map((time) =>
      extractHours(time)
    );

    res.status(200).json({
      employeeCount,
      employeesPresentToday,
      employeesAbsentToday,
      totalHoursThisWeek,
      totalMinutesThisWeek,
      employeeCreated,
      employeeAttendance,
      employeeWorkHour: employeeWorkHourHours,
    });
  } catch (e) {
    return errorHandler({
      res,
      e,
      code: 500,
      title: "Getting Admin Dash Data",
      message: "Server Error on Getting Dash Data from Admin",
    });
  }
}
