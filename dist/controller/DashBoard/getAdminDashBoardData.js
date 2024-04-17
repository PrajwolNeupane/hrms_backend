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
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
const auth_1 = require("../../model/auth");
const attendance_1 = require("../../model/attendance");
const timeDifferenceFinder_1 = __importDefault(require("../../utils/timeDifferenceFinder"));
const sumTime_1 = __importDefault(require("../../utils/sumTime"));
// Function to extract hours from a time string (format: "hh:mm")
const extractHours = (timeString) => {
    const [hours] = timeString.split(":").map(Number);
    return hours;
};
function getAdminDashBoardData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const employees = yield auth_1.Employee.find({ isDeleted: false });
            const employeeCount = employees.length;
            // Get the start and end of the current day
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);
            // Count the distinct employees present today
            const employeesPresentToday = (yield attendance_1.Attendance.distinct("employee_id", {
                createdAt: {
                    $gte: startOfDay,
                    $lt: endOfDay,
                },
            })).length;
            const employeesAbsentToday = employeeCount - employeesPresentToday;
            // Initialize arrays to hold employee creation counts, attendance, and work hours for each day of the month
            const employeeCreated = new Array(12).fill(0);
            const numberOfDaysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
            const employeeAttendance = new Array(numberOfDaysInMonth).fill(0);
            const employeeWorkHour = new Array(numberOfDaysInMonth).fill("00:00");
            // Count employees created in each month
            employees.forEach((employee) => {
                const creationMonth = new Date(employee.date_joined).getMonth();
                employeeCreated[creationMonth]++;
            });
            // Iterate through attendance records to count employees present for each date and calculate work hours
            const attendanceRecords = yield attendance_1.Attendance.find({
                createdAt: {
                    $gte: new Date().setDate(1),
                    $lte: new Date().setDate(numberOfDaysInMonth),
                },
            });
            attendanceRecords.forEach((record) => {
                const attendanceDate = new Date(record.createdAt).getDate();
                employeeAttendance[attendanceDate - 1]++;
                if (record.clockOut) {
                    const diff = (0, timeDifferenceFinder_1.default)(record.clockIn, record.clockOut);
                    const totalHoursWorkedForDay = (0, sumTime_1.default)(employeeWorkHour[attendanceDate - 1], diff);
                    employeeWorkHour[attendanceDate - 1] = totalHoursWorkedForDay;
                }
            });
            // Get the total hours worked for each employee this week
            const totalHoursPromises = employees.map((curr) => __awaiter(this, void 0, void 0, function* () {
                const startOfWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 * 7);
                const endOfWeek = new Date(Date.now());
                const attendance = yield attendance_1.Attendance.find({
                    employee_id: curr._id,
                    createdAt: {
                        $gte: startOfWeek,
                        $lt: endOfWeek,
                    },
                });
                let totalHoursWorkedForEmployee = "00:00";
                attendance.forEach((att) => {
                    if (att.clockOut) {
                        const diff = (0, timeDifferenceFinder_1.default)(att.clockIn, att.clockOut);
                        totalHoursWorkedForEmployee = (0, sumTime_1.default)(totalHoursWorkedForEmployee, diff);
                    }
                });
                return totalHoursWorkedForEmployee;
            }));
            // Wait for all the promises to resolve
            const totalHoursWorkedThisWeekArray = yield Promise.all(totalHoursPromises);
            // Sum up the total hours worked for all employees
            let totalHoursWorkedThisWeek = "00:00";
            totalHoursWorkedThisWeekArray.forEach((hours) => {
                totalHoursWorkedThisWeek = (0, sumTime_1.default)(totalHoursWorkedThisWeek, hours);
            });
            // Extract only the hours portion from the total hours worked this week
            const totalHoursThisWeekHours = extractHours(totalHoursWorkedThisWeek);
            // Extract only the hours portion from each day's work hours
            const employeeWorkHourHours = employeeWorkHour.map((time) => extractHours(time));
            res.status(200).json({
                employeeCount,
                employeesPresentToday,
                employeesAbsentToday,
                totalHoursThisWeek: totalHoursThisWeekHours,
                employeeCreated,
                employeeAttendance,
                employeeWorkHour: employeeWorkHourHours,
            });
        }
        catch (e) {
            return (0, errorHandler_1.default)({
                res,
                e,
                code: 500,
                title: "Getting Admin Dash Data",
                message: "Server Error on Getting Dash Data from Admin",
            });
        }
    });
}
exports.default = getAdminDashBoardData;
//# sourceMappingURL=getAdminDashBoardData.js.map