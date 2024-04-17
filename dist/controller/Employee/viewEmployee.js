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
const auth_1 = require("../../model/auth");
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
function viewEmploye(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const employee = yield auth_1.Employee.findOne({
                isDeleted: false,
                _id: req.body.id,
            })
                .select(["-password"])
                .populate("roles")
                .populate("bank");
            res.json({ employee });
        }
        catch (e) {
            return (0, errorHandler_1.default)({
                res,
                e,
                code: 500,
                title: "View Employee",
                message: "Server Error on Getting Employee",
            });
        }
    });
}
exports.default = viewEmploye;
//# sourceMappingURL=viewEmployee.js.map