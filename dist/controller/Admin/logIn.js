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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv/config");
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
const validations_1 = require("../../type/validations");
const auth_1 = require("../../model/auth");
function logIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error, value } = validations_1.logInEmployeeValidation.validate(req.body);
        if (error) {
            (0, errorHandler_1.default)({
                res,
                code: 400,
                title: "Admin LogIn",
                message: error.details[0].message,
            });
            return;
        }
        try {
            const admin = yield auth_1.Admin.findOne({
                email: value.email,
            });
            if (!admin) {
                return (0, errorHandler_1.default)({
                    res,
                    code: 401,
                    title: "Login Admin",
                    message: "Invalid Admin Credentials",
                });
            }
            const validPassword = yield bcrypt_1.default.compare(value.password, admin.password);
            if (!validPassword) {
                return (0, errorHandler_1.default)({
                    res,
                    code: 401,
                    title: "Login Admin",
                    message: "Invalid Admin Credentials",
                });
            }
            const token = jsonwebtoken_1.default.sign({
                id: admin._id,
            }, process.env.JWT_TOKEN);
            res.cookie("auth_token", token, {
                httpOnly: true,
                sameSite: false,
                secure: true,
            });
            res.cookie("is_admin", true, {
                httpOnly: true,
                sameSite: false,
                secure: true,
            });
            res.json({
                success: true,
                message: "Log In Successfully",
            });
        }
        catch (e) {
            return (0, errorHandler_1.default)({
                res,
                e,
                code: 500,
                title: "Admin Login",
                message: "Server Error on Logging Employee",
            });
        }
    });
}
exports.default = logIn;
//# sourceMappingURL=logIn.js.map