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
const nodemailer_1 = __importDefault(require("nodemailer"));
function forgetPasswordMailSender(_a) {
    return __awaiter(this, arguments, void 0, function* ({ token, email, template, }) {
        try {
            let config = {
                service: "gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD,
                },
            };
            let transporter = nodemailer_1.default.createTransport(config);
            // Verify connection configuration
            yield new Promise((resolve, reject) => {
                transporter.verify(function (error, success) {
                    if (error) {
                        console.log("Error verifying connection:", error);
                        reject(error);
                    }
                    else {
                        console.log("Server is ready to take our messages");
                        resolve(success);
                    }
                });
            });
            let message = {
                from: process.env.EMAIL,
                to: email,
                subject: "HRMS Password Forgot",
                html: template({ token }),
            };
            // Send email
            yield new Promise((resolve, reject) => {
                transporter.sendMail(message, (error, info) => {
                    if (error) {
                        console.error("Error sending email:", error);
                        reject(error);
                    }
                    else {
                        console.log("Email sent:", info.response);
                        resolve(info);
                    }
                });
            });
            console.log("Email sent successfully!");
        }
        catch (error) {
            console.log("-----ERROR-----");
            console.log(error);
        }
    });
}
exports.default = forgetPasswordMailSender;
//# sourceMappingURL=forgetPasswordMailSender.js.map