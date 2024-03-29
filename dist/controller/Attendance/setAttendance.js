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
const validations_1 = require("../../type/validations");
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
const attendance_1 = require("../../model/attendance");
const timeDifferenceFinder_1 = __importDefault(require("../../utils/timeDifferenceFinder"));
function setAttendance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error, value } = validations_1.setAttendanceValidation.validate(req.body);
        if (error) {
            (0, errorHandler_1.default)({
                res,
                code: 400,
                title: "Set Attendance",
                message: error.details[0].message,
            });
            return;
        }
        if ((req.user && !req.admin) || (req.user && req.admin == undefined)) {
            if (value.clockIn) {
                var attendance = new attendance_1.Attendance({
                    employee_id: req.user,
                    clockIn: value.clockIn,
                });
                attendance = yield attendance.save();
                return res.json({
                    success: true,
                    title: "Attendance",
                    message: "Clock in successfully",
                });
            }
            if (value.clockOut) {
                const attendance = yield attendance_1.Attendance.findOne({
                    employee_id: req.user,
                })
                    .populate({ path: "employee_id", select: "-__v" })
                    .sort({ clockIn: -1 })
                    .exec();
                if (attendance) {
                    attendance.clockOut = value.clockOut;
                    yield attendance.save();
                    return res.json({
                        success: true,
                        title: "Attendance",
                        message: "Clock out successfully",
                        time: (0, timeDifferenceFinder_1.default)(attendance.clockIn, value.clockOut),
                        attendance,
                    });
                }
            }
        }
    });
}
exports.default = setAttendance;
//# sourceMappingURL=setAttendance.js.map