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
const auth_1 = require("../../model/auth");
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
require("dotenv/config");
const validations_1 = require("../../type/validations");
function createAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error, value } = validations_1.createAdminValidation.validate(req.body);
            if (error) {
                (0, errorHandler_1.default)({
                    res,
                    code: 400,
                    title: "Create Admin",
                    message: error.details[0].message,
                });
                return;
            }
            const existingAdmin = yield auth_1.Admin.findOne({
                email: value.email,
            });
            if (existingAdmin) {
                return (0, errorHandler_1.default)({
                    res,
                    code: 409,
                    title: "Create Admin",
                    message: "Admin with email already exists",
                });
            }
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(value.password, salt);
            var admin = new auth_1.Admin({
                email: value.email,
                password: hashedPassword,
                photo: "https://www.kindpng.com/picc/m/475-4750705_school-administrator-icon-png-transparent-png.png",
            });
            admin = yield admin.save();
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
            return res.json({
                success: true,
                message: "Admin Account Created",
            });
        }
        catch (e) {
            return (0, errorHandler_1.default)({
                res,
                e,
                code: 500,
                title: "Create Admin",
                message: "Server Error on Creating Admin",
            });
        }
    });
}
exports.default = createAdmin;
//# sourceMappingURL=createAdmin.js.map