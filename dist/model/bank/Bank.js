"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BankModel = new mongoose_1.default.Schema({
    account_number: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
});
const Bank = mongoose_1.default.model("Bank", BankModel);
exports.default = Bank;
//# sourceMappingURL=Bank.js.map