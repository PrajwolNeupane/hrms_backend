"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
function authenticateAdmin(req, res, next) {
    if (req.cookies.auth_token && req.cookies.is_admin) {
        next();
    }
    else {
        return (0, errorHandler_1.default)({
            res,
            code: 403,
            title: "Forbidden",
            message: "User Forbidden",
        });
    }
}
exports.default = authenticateAdmin;
//# sourceMappingURL=authenticateAdmin.js.map