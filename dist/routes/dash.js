"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const DashBoard_1 = require("../controller/DashBoard");
const router = express_1.default.Router();
router.get("/", middleware_1.authenticateUser, DashBoard_1.getDashBoardData);
exports.default = router;
//# sourceMappingURL=dash.js.map