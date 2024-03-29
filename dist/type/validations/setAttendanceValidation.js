"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const setAttendanceValidation = joi_1.default.object({
    clockIn: joi_1.default.string(),
    clockOut: joi_1.default.string()
});
exports.default = setAttendanceValidation;
//# sourceMappingURL=setAttendanceValidation.js.map