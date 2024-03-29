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
const tokenGenerator_1 = __importDefault(require("../../utils/tokenGenerator"));
const auth_1 = require("../../model/auth");
const forgetPasswordMailSender_1 = __importDefault(require("../..//utils/forgetPasswordMailSender"));
const forgetPasswordTemplate_1 = __importDefault(require("../../conts/forgetPasswordTemplate"));
function forgetPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.body.email) {
                const generatedToken = (0, tokenGenerator_1.default)().toString();
                const expireDate = new Date();
                expireDate.setMinutes(expireDate.getMinutes() + 5);
                var token = new auth_1.Token({
                    token: `${generatedToken}`,
                    expire_date: expireDate.toISOString(),
                    valid_email: req.body.email,
                });
                yield token.save();
                (0, forgetPasswordMailSender_1.default)({
                    email: req.body.email,
                    template: forgetPasswordTemplate_1.default,
                    token: generatedToken,
                });
                return res.json({
                    success: true,
                    message: "Forget Password Token Sent",
                });
            }
            else {
                return (0, errorHandler_1.default)({
                    res,
                    code: 500,
                    title: "Email is needed",
                    message: "Server Error on Employee Authetication",
                });
            }
        }
        catch (e) {
            return (0, errorHandler_1.default)({
                res,
                e,
                code: 500,
                title: "Employee Authetication",
                message: "Server Error on Employee Authetication",
            });
        }
    });
}
exports.default = forgetPassword;
//# sourceMappingURL=forgetPassword.js.map