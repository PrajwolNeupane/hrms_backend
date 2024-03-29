"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAdmin = exports.checkSuperAdmin = exports.authenticateUser = void 0;
const authenticateUser_1 = __importDefault(require("./authenticateUser"));
exports.authenticateUser = authenticateUser_1.default;
const checkSuperAdmin_1 = __importDefault(require("./checkSuperAdmin"));
exports.checkSuperAdmin = checkSuperAdmin_1.default;
const authenticateAdmin_1 = __importDefault(require("./authenticateAdmin"));
exports.authenticateAdmin = authenticateAdmin_1.default;
//# sourceMappingURL=index.js.map