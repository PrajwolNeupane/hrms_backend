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
require("dotenv/config");
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
const auth_1 = require("../../model/auth");
const bcrypt_1 = __importDefault(require("bcrypt"));
function resetPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { token, password } = req.body;
            if (!token) {
                return (0, errorHandler_1.default)({
                    res,
                    code: 400,
                    title: "Token",
                    message: "Token is required",
                });
            }
            if (!password) {
                return (0, errorHandler_1.default)({
                    res,
                    code: 400,
                    title: "Password",
                    message: "New Password is required",
                });
            }
            const currentDateTime = new Date();
            // Delete tokens that have expired
            yield auth_1.Token.deleteMany({
                expire_date: { $lt: currentDateTime.toISOString() },
            });
            const foundToken = yield auth_1.Token.findOne({ token });
            if (!foundToken) {
                return (0, errorHandler_1.default)({
                    res,
                    code: 404,
                    title: "Token",
                    message: "Token not found",
                });
            }
            const tokenExpiryDate = new Date(foundToken.expire_date);
            if (currentDateTime > tokenExpiryDate) {
                return (0, errorHandler_1.default)({
                    res,
                    code: 401,
                    title: "Token",
                    message: "Token has expired",
                });
            }
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            var employee = yield auth_1.Employee.findOne({ email: foundToken.valid_email });
            if (employee) {
                employee.password = hashedPassword;
                yield employee.save();
            }
            yield foundToken.deleteOne();
            // If token is valid and not expired
            res.json({
                title: "Password Reset",
                message: "Password Reset Successfull",
            });
        }
        catch (error) {
            return (0, errorHandler_1.default)({
                res,
                e: error,
                code: 500,
                title: "Server Error",
                message: "An error occurred while processing the request",
            });
        }
    });
}
exports.default = resetPassword;
//# sourceMappingURL=employeeResetPassword.js.map