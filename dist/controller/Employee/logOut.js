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
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
function logOut(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.user) {
                // Clear cookies
                const cookies = Object.assign({}, req.cookies); // Create a copy of the cookies object
                for (const cookieName in cookies) {
                    // Clear each cookie by setting it to an expired value
                    res.cookie(cookieName, "", { expires: new Date(0) });
                }
                return res.json({
                    success: true,
                    message: "Employee Logout Successfully",
                });
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
exports.default = logOut;
//# sourceMappingURL=logOut.js.map