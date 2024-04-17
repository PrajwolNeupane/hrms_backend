"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const DashBoard_1 = require("../controller/DashBoard");
const Employee_1 = require("../controller/Employee");
const router = express_1.default.Router();
router.get("/", middleware_1.authenticateUser, DashBoard_1.getEmployeeDashBoardData);
router.get("/admin", middleware_1.authenticateAdmin, DashBoard_1.getAdminDashBoardData);
router.get("/employee", middleware_1.authenticateAdmin, Employee_1.getEmployee);
router.post("/employee/delete", middleware_1.authenticateAdmin, Employee_1.deleteEmployee);
router.post("/employee/view", middleware_1.authenticateAdmin, Employee_1.viewEmploye);
exports.default = router;
//# sourceMappingURL=dash.js.map