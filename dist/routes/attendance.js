"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("../middleware");
const Attendance_1 = require("../controller/Attendance");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/set", middleware_1.authenticateUser, Attendance_1.setAttendance);
router.get("/get", middleware_1.authenticateUser, Attendance_1.getAttendance);
router.post("/employees", middleware_1.authenticateUser, Attendance_1.getEmployeesAttendance);
exports.default = router;
//# sourceMappingURL=attendance.js.map