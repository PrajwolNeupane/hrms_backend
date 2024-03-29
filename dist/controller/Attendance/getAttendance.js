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
function getAttendance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var employee = yield auth_1.Employee.findById(req.user);
        var attendance = yield attendance_1.Attendance.find({ employee_id: req.user });
        var totalTime = "00:00";
        var timeDiff = [""];
        if (attendance) {
            attendance.map((curr, indx) => {
                if (curr.clockOut) {
                    const diff = (0, timeDifferenceFinder_1.default)(curr.clockIn, curr.clockOut);
                    timeDiff.push(diff);
                    totalTime = (0, sumTime_1.default)(totalTime, diff);
                }
            });
        }
        return res.json({
            employee,
            totalTime,
            timeDiff,
        });
    });
}
exports.default = getAttendance;
//# sourceMappingURL=getAttendance.js.map