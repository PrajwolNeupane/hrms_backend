"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
function checkSuperAdmin(req, res, next) {
    const superKeyHeader = req.headers["super_key"]; // Get the value of the 'super_key' header
    if (superKeyHeader && superKeyHeader === process.env.SUPER_KEY) {
        // Check if the 'super_key' header exists and matches the value of process.env.SUPER_KEY
        next(); // Proceed to the next middleware
    }
    else {
        // If the 'super_key' header is missing or doesn't match, send a 403 Forbidden response\
        return (0, errorHandler_1.default)({
            res,
            code: 403,
            title: "Forbidden",
            message: "User Forbidden",
        });
    }
}
exports.default = checkSuperAdmin;
//# sourceMappingURL=checkSuperAdmin.js.map