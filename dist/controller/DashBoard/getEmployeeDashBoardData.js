"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../../model/auth");
const attendance_1 = require("../../model/attendance");
const timeDifferenceFinder_1 = __importDefault(require("../../utils/timeDifferenceFinder"));
const sumTime_1 = __importDefault(require("../../utils/sumTime"));
function averageTimeInHHMM(totalTime, divisor) {
    // Convert total time string to total minutes
    const [hours, minutes] = totalTime.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;
    // Calculate average total minutes
    const averageTotalMinutes = Math.floor(totalMinutes / divisor);
    // Calculate average hours and minutes
    const averageHours = Math.floor(averageTotalMinutes / 60);
    const averageMinutes = averageTotalMinutes % 60;
    // Format average time in "hh:mm" format
    const averageTimeString = `${averageHours
        .toString()
        .padStart(2, "0")}:${averageMinutes.toString().padStart(2, "0")}`;
    return averageTimeString;
}
function getEmployeeDashBoardData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const employee = yield auth_1.Employee.findById(req.user);
        const attendance = yield attendance_1.Attendance.find({ employee_id: req.user });
        // Get the current month and year
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        // Filter attendances for the current month and exclude future days and Saturdays
        const currentMonthAttendances = attendance.filter((att) => {
            const attendanceDate = new Date(att.createdAt);
            const dayOfMonth = attendanceDate.getDate();
            const dayOfWeek = attendanceDate.getDay();
            const isFutureDay = attendanceDate.getMonth() > currentMonth ||
                attendanceDate.getFullYear() > currentYear ||
                dayOfMonth > currentDate.getDate();
            const isSaturday = dayOfWeek === 6; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
            return (attendanceDate.getMonth() === currentMonth &&
                attendanceDate.getFullYear() === currentYear &&
                !isFutureDay &&
                !isSaturday);
        });
        // Calculate present and absent counts
        const presentCount = currentMonthAttendances.length;
        const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const saturdaysInMonth = Math.floor((totalDaysInMonth -
            currentDate.getDate() +
            ((currentDate.getDay() + 1) % 7)) /
            7);
        const absentCount = currentDate.getDate() - presentCount - saturdaysInMonth;
        // Calculate total hours worked this month
        let totalHoursWorkedThisMonth = "00:00";
        var timeStamp = Array.from({ length: new Date(currentYear, currentMonth + 1, 0).getDate() }, () => "00:00");
        if (currentMonthAttendances.length > 0) {
            currentMonthAttendances.forEach((curr) => {
                if (curr.clockOut) {
                    const diff = (0, timeDifferenceFinder_1.default)(curr.clockIn, curr.clockOut);
                    timeStamp[new Date(curr.createdAt).getDate()] = diff;
                    totalHoursWorkedThisMonth = (0, sumTime_1.default)(totalHoursWorkedThisMonth, diff);
                }
            });
        }
        // Calculate average hours working
        const averageHoursWorking = presentCount > 0
            ? averageTimeInHHMM(totalHoursWorkedThisMonth, presentCount)
            : "00:00";
        return res.json({
            average_hours_working: averageHoursWorking,
            total_absent: absentCount,
            attendanceChart: {
                present: presentCount,
                absent: absentCount,
            },
            total_hours_worked_this_month: totalHoursWorkedThisMonth,
            timeStamp,
            currentMonthAttendances,
        });
    });
}
exports.default = getEmployeeDashBoardData;
//# sourceMappingURL=getEmployeeDashBoardData.js.map