"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
function mailSender({ email, password, template, }) {
    let config = {
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    };
    let transporter = nodemailer_1.default.createTransport(config);
    let message = {
        from: process.env.EMAIL,
        to: email,
        subject: "HRMS Credientals Created",
        html: template({ email, password }),
    };
    transporter
        .sendMail(message)
        .then(() => { })
        .catch((error) => {
        console.log("-----ERROR-----");
        console.log(error);
    });
}
exports.default = mailSender;
//# sourceMappingURL=mailSender.js.map