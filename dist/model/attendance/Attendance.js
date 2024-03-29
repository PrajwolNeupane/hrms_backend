"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AttendanceModel = new mongoose_1.default.Schema({
    employee_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    clockIn: {
        type: String,
        required: true
    },
    clockOut: {
        type: String
    }
});
const Attendance = mongoose_1.default.model("Attedance", AttendanceModel);
exports.default = Attendance;
//# sourceMappingURL=Attendance.js.map