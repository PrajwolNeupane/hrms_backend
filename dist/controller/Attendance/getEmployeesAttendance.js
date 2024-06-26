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
const attendance_1 = require("../../model/attendance");
const timeDifferenceFinder_1 = __importDefault(require("../..//utils/timeDifferenceFinder"));
function getEmployeesAttendance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const date = req.body.date;
        try {
            const attendance = yield attendance_1.Attendance.find({
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
                        timeDifference: (0, timeDifferenceFinder_1.default)(curr === null || curr === void 0 ? void 0 : curr.clockIn, curr === null || curr === void 0 ? void 0 : curr.clockOut),
                    });
                }
                else if (curr.clockIn) {
                    acc.push({
                        employee: curr.employee_id,
                        clockIn: curr.clockIn,
                        clockOut: "---",
                        createdAt: curr.createdAt,
                        timeDifference: "---",
                    });
                }
                return acc;
            }, []);
            res.status(200).json(employeesPresent);
        }
        catch (e) {
            return (0, errorHandler_1.default)({
                res,
                e,
                code: 500,
                title: "Get attendance employees",
                message: "Server Error on getting employees attendance log",
            });
        }
    });
}
exports.default = getEmployeesAttendance;
//# sourceMappingURL=getEmployeesAttendance.js.map