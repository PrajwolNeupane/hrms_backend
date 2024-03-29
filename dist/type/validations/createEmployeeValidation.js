"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const createEmployeeValidation = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    first_name: joi_1.default.string().required(),
    middle_name: joi_1.default.string().allow("").optional(),
    last_name: joi_1.default.string().required(),
    phone: joi_1.default.string().allow("").optional(),
    gender: joi_1.default.string().required(),
    dob: joi_1.default.date().required(),
    address: joi_1.default.string().required(),
    salary: joi_1.default.number().default(0),
    pan_number: joi_1.default.string().allow("").optional().default(""),
    date_joined: joi_1.default.date().default(new Date()),
    role: joi_1.default.string().required(), // Assuming the role IDs are strings
    isDeleted: joi_1.default.boolean().default(false),
});
exports.default = createEmployeeValidation;
//# sourceMappingURL=createEmployeeValidation.js.map