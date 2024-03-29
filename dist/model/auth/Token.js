"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TokenModel = new mongoose_1.default.Schema({
    token: {
        type: String,
        required: true,
    },
    expire_date: {
        type: String,
        required: true,
    },
    valid_email: {
        type: String,
        required: true,
    },
});
const Token = mongoose_1.default.model("Token", TokenModel);
exports.default = Token;
//# sourceMappingURL=Token.js.map