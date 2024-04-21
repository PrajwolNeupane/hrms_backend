"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const changePasswordValidation = joi_1.default.object({
    currentPassword: joi_1.default.string().required().min(8),
    newPassword: joi_1.default.string().required().min(8),
});
exports.default = changePasswordValidation;
//# sourceMappingURL=changePasswordValidation.js.map