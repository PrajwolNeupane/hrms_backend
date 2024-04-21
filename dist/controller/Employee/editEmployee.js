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
const auth_1 = require("../../model/auth");
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
function editEmlpoyee(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error, value } = validations_1.createEmployeeValidation.validate(req.body);
        if (error) {
            (0, errorHandler_1.default)({
                res,
                code: 400,
                title: "Edit Employee",
                message: error.details[0].message,
            });
            return;
        }
        try {
            yield auth_1.Employee.findOneAndUpdate({ email: value.email }, Object.assign({}, value));
            return res.json({
                success: true,
                message: "Employee Edited",
            });
        }
        catch (e) {
            return (0, errorHandler_1.default)({
                res,
                e,
                code: 500,
                title: "Edit Employee",
                message: "Server Error on Editing Employee",
            });
        }
    });
}
exports.default = editEmlpoyee;
//# sourceMappingURL=editEmployee.js.map