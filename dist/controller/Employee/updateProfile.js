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
function updateProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { first_name, middle_name, last_name, phone, pan_number } = req.body;
            // Find the employee by the provided user ID
            const employee = yield auth_1.Employee.findById(req.user)
                .select(["-password"])
                .populate("roles", "-__v")
                .populate("bank", "-__v");
            if (!employee) {
                return (0, errorHandler_1.default)({
                    res,
                    code: 404,
                    title: "Employee Not Found",
                    message: "Employee not found in the database.",
                });
            }
            // Update the employee's information with the provided values
            employee.first_name = first_name || employee.first_name;
            employee.middle_name = middle_name;
            employee.last_name = last_name || employee.last_name;
            employee.phone = phone || employee.phone;
            employee.pan_number = pan_number || employee.pan_number;
            // Save the updated employee information
            const updatedEmployee = yield employee.save();
            return res.json({
                success: true,
                message: "Employee profile updated successfully",
                employee: updatedEmployee,
            });
        }
        catch (e) {
            return (0, errorHandler_1.default)({
                res,
                e,
                code: 500,
                title: "Employee",
                message: "Server Error on Employee Profile Update",
            });
        }
    });
}
exports.default = updateProfile;
//# sourceMappingURL=updateProfile.js.map