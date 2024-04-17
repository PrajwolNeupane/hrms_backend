"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.getEmployee = exports.resetPassword = exports.forgetPassword = exports.logOut = exports.auth = exports.createEmployee = exports.logIn = void 0;
const createEmployee_1 = __importDefault(require("./createEmployee"));
exports.createEmployee = createEmployee_1.default;
const auth_1 = __importDefault(require("./auth"));
exports.auth = auth_1.default;
const logOut_1 = __importDefault(require("./logOut"));
exports.logOut = logOut_1.default;
const logIn_1 = __importDefault(require("./logIn"));
exports.logIn = logIn_1.default;
const forgetPassword_1 = __importDefault(require("./forgetPassword"));
exports.forgetPassword = forgetPassword_1.default;
const resetPassword_1 = __importDefault(require("./resetPassword"));
exports.resetPassword = resetPassword_1.default;
const getEmployee_1 = __importDefault(require("./getEmployee"));
exports.getEmployee = getEmployee_1.default;
const deleteEmployee_1 = __importDefault(require("./deleteEmployee"));
exports.deleteEmployee = deleteEmployee_1.default;
//# sourceMappingURL=index.js.map