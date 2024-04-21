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
const validations_1 = require("../../type/validations");
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function changePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error, value } = validations_1.changePasswordValidation.validate(req.body);
        if (error) {
            return (0, errorHandler_1.default)({
                res,
                code: 400,
                title: "Change Password",
                message: error.details[0].message,
            });
        }
        try {
            const admin = yield auth_1.Admin.findById(req.user);
            if (!admin) {
                return (0, errorHandler_1.default)({
                    res,
                    code: 404,
                    title: "Change Password",
                    message: "Admin not found",
                });
            }
            const { currentPassword, newPassword } = value;
            const isValidPassword = yield bcrypt_1.default.compare(currentPassword, admin.password);
            if (!isValidPassword) {
                return (0, errorHandler_1.default)({
                    res,
                    code: 401,
                    title: "Change Password",
                    message: "Invalid current password",
                });
            }
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(newPassword, salt);
            admin.password = hashedPassword;
            yield admin.save();
            res.json({
                title: "Change Password",
                message: "Password changed successfully",
            });
        }
        catch (e) {
            return (0, errorHandler_1.default)({
                res,
                e,
                code: 500,
                title: "Change Password",
                message: "Server Error on Changing Password",
            });
        }
    });
}
exports.default = changePassword;
//# sourceMappingURL=changePassword.js.map