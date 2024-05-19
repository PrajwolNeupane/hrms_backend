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
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
function getEmployeePerfomance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const employees = yield auth_1.Employee.find({ isDeleted: false });
            const attendanceRecords = yield attendance_1.Attendance.find();
            const employeePerformanceData = [];
            for (const employee of employees) {
                const employeeAttendance = attendanceRecords.filter((record) => record.employee_id.toString() === employee._id.toString());
                const totalWorkedTime = employeeAttendance.reduce((totalTime, record) => {
                    if (record.clockOut) {
                        const workedTime = (0, timeDifferenceFinder_1.default)(record.clockIn, record.clockOut);
                        return (0, sumTime_1.default)(totalTime, workedTime);
                    }
                    return totalTime;
                }, "00:00");
                const totalWorkedTimeThisMonth = employeeAttendance
                    .filter((record) => {
                    const recordDate = new Date(record.createdAt);
                    const currentMonth = new Date().getMonth();
                    const currentYear = new Date().getFullYear();
                    return (recordDate.getMonth() === currentMonth &&
                        recordDate.getFullYear() === currentYear);
                })
                    .reduce((totalTime, record) => {
                    if (record.clockOut) {
                        const workedTime = (0, timeDifferenceFinder_1.default)(record.clockIn, record.clockOut);
                        return (0, sumTime_1.default)(totalTime, workedTime);
                    }
                    return totalTime;
                }, "00:00");
                const [totalWorkedHours, totalWorkedMinutes] = totalWorkedTime
                    .split(":")
                    .map(Number);
                const totalWorkedTimeInMinutes = totalWorkedHours * 60 + totalWorkedMinutes;
                const averageWorkedTime = employeeAttendance.length > 0
                    ? convertMinutesToTimeString(totalWorkedTimeInMinutes / employeeAttendance.length)
                    : "00:00";
                const currentMonth = new Date().getMonth();
                const currentYear = new Date().getFullYear();
                const currentDate = new Date().getDate();
                const expectedWorkingDays = Math.floor((currentDate * 5) / 7) +
                    (currentDate % 7 > 0 ? (currentDate % 7 < 6 ? 1 : 0) : 0); // Assuming 5 working days per week
                const uniqueDates = new Set();
                employeeAttendance.filter((record) => {
                    const recordDate = new Date(record.createdAt);
                    if (recordDate.getMonth() === currentMonth &&
                        recordDate.getFullYear() === currentYear &&
                        recordDate.getDate() <= new Date().getDate()) {
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
        }
        catch (e) {
            return (0, errorHandler_1.default)({
                res,
                e,
                code: 500,
                title: "Getting Employee Performance Data",
                message: "Server Error on Getting Employee Performance",
            });
        }
    });
}
exports.default = getEmployeePerfomance;
function convertMinutesToTimeString(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${remainingMinutes
        .toString()
        .padStart(2, "0")}`;
}
//# sourceMappingURL=getEmployeePerfomance.js.map