"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("../middleware");
const Employee_1 = require("../controller/Employee");
const Admin_1 = require("../controller/Admin");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", middleware_1.authenticateUser, Employee_1.auth);
router.get("/signout", middleware_1.authenticateUser, Employee_1.logOut);
router.post("/forgetpassword", Employee_1.forgetPassword);
router.post("/admin/resetpassword", Admin_1.resetPassword);
router.post("/resetpassword", Employee_1.resetPassword);
router.post("/employee/signup", [middleware_1.authenticateUser, middleware_1.authenticateAdmin], Employee_1.createEmployee);
router.post("/employee/signin", Employee_1.logIn);
router.post("/admin/signup", middleware_1.checkSuperAdmin, Admin_1.createAdmin);
router.post("/admin/changepassword", [middleware_1.authenticateUser, middleware_1.authenticateAdmin], Admin_1.changePassword);
router.post("/admin/signin", Admin_1.logIn);
exports.default = router;
//# sourceMappingURL=auth.js.map