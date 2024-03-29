"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
function authenticateUser(req, res, next) {
    if (req.cookies.auth_token && !req.cookies.is_admin) {
        try {
            const decoded = jsonwebtoken_1.default.verify(req.cookies.auth_token, process.env.JWT_TOKEN);
            req.user = decoded === null || decoded === void 0 ? void 0 : decoded.id;
            req.admin = false;
            next();
        }
        catch (e) {
            return (0, errorHandler_1.default)({
                res,
                code: 403,
                e,
                title: "Invalid Auth Token",
                message: "Invalid Auth Token",
            });
        }
    }
    else if (req.cookies.auth_token && req.cookies.is_admin) {
        try {
            const decoded = jsonwebtoken_1.default.verify(req.cookies.auth_token, process.env.JWT_TOKEN);
            req.user = decoded === null || decoded === void 0 ? void 0 : decoded.id;
            req.admin = true;
            next();
        }
        catch (e) {
            return (0, errorHandler_1.default)({
                res,
                code: 403,
                e,
                title: "Invalid Auth Token",
                message: "Invalid Auth Token",
            });
        }
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
exports.default = authenticateUser;
//# sourceMappingURL=authenticateUser.js.map