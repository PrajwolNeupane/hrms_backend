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
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../../model/auth");
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
const Role_1 = __importDefault(require("../../model/role/Role"));
const generatePassword_1 = __importDefault(require("../../utils/generatePassword"));
const mailSender_1 = __importDefault(require("../../utils/mailSender"));
const credientalsTemplate_1 = __importDefault(require("../../conts/credientalsTemplate"));
require("dotenv/config");
const avatarGenerator_1 = __importDefault(require("../../utils/avatarGenerator"));
const validations_1 = require("../../type/validations");
function createEmployee(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error, value } = validations_1.createEmployeeValidation.validate(req.body);
        if (error) {
            (0, errorHandler_1.default)({
                res,
                code: 400,
                title: "Create Employee",
                message: error.details[0].message,
            });
            return;
        }
        try {
            if (value.email) {
                const existingEmployee = yield auth_1.Employee.findOne({
                    email: value.email,
                });
                if (existingEmployee) {
                    return (0, errorHandler_1.default)({
                        res,
                        code: 409,
                        title: "Create Employee",
                        message: "Employee with email already exists",
                    });
                }
                const generatedPassword = (0, generatePassword_1.default)(10);
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashedPassword = yield bcrypt_1.default.hash(generatedPassword, salt);
                // Create the Role
                const role = new Role_1.default({
                    name: value.role,
                    date_joined: value.date_joined,
                });
                // Save the Role of Employee
                const savedRole = yield role.save();
                // Create the Employee
                const employee = new auth_1.Employee({
                    email: value.email,
                    first_name: value.first_name,
                    middle_name: value.middle_name || null, // Use value.middle_name if it exists, otherwise use null
                    last_name: value.last_name,
                    phone: value.phone || null, // Use value.phone if it exists, otherwise use null
                    gender: value.gender,
                    password: hashedPassword,
                    photo: (0, avatarGenerator_1.default)(value.first_name, value.last_name), // Use value.first_name and value.last_name
                    dob: value.dob,
                    address: value.address,
                    salary: value.salary,
                    pan_number: "",
                    date_joined: value.date_joined,
                    roles: [savedRole._id], // Assign the saved Role's _id
                    isDeleted: false,
                });
                // Save the Employee
                yield employee.save();
                // Send mail with credentials
                (0, mailSender_1.default)({
                    email: req.body.email,
                    password: generatedPassword,
                    template: credientalsTemplate_1.default,
                });
                return res.json({
                    success: true,
                    message: "Employee Account Created",
                });
            }
        }
        catch (e) {
            return (0, errorHandler_1.default)({
                res,
                e,
                code: 500,
                title: "Create Employee",
                message: "Server Error on Creating Employee",
            });
        }
    });
}
exports.default = createEmployee;
//# sourceMappingURL=createEmployee.js.map