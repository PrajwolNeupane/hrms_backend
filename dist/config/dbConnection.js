"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
exports.default = mongoose_1.default
    .connect(`${process.env.MONGODB_URI}`)
    .then(() => {
    console.log("Connected to Mongo DB");
})
    .catch((e) => {
    console.log("Error on connecting Mongo DB");
    console.log(e.message);
});
//# sourceMappingURL=dbConnection.js.map