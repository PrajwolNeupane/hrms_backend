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
const bank_1 = require("../../model/bank");
function updateBank(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { bankName, bankBranch, bankAccountNumber } = req.body;
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
            // Find the employee's existing bank information
            const existingBank = employee.bank;
            // Create a new bank object or update the existing one
            const bank = existingBank
                ? yield bank_1.Bank.findByIdAndUpdate(existingBank._id, {
                    name: bankName,
                    branch: bankBranch,
                    account_number: bankAccountNumber,
                }, { new: true })
                : yield bank_1.Bank.create({
                    name: bankName,
                    branch: bankBranch,
                    account_number: bankAccountNumber,
                });
            // Update the employee's bank reference
            employee.bank = bank._id;
            // Save the updated employee information
            const updatedEmployee = yield employee.save();
            return res.json({
                success: true,
                message: "Employee bank information updated successfully",
                employee: updatedEmployee,
            });
        }
        catch (e) {
            return (0, errorHandler_1.default)({
                res,
                e,
                code: 500,
                title: "Employee",
                message: "Server Error on Employee Bank Information Update",
            });
        }
    });
}
exports.default = updateBank;
//# sourceMappingURL=updateBank.js.map