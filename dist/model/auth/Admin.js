"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AdminModel = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
    },
    photo: { type: String, required: true },
    password: {
        type: String,
        required: true,
    },
});
const Admin = mongoose_1.default.model("Admin", AdminModel);
exports.default = Admin;
//# sourceMappingURL=Admin.js.map