import express from "express";
import { authenticateAdmin, authenticateUser } from "../middleware";
import {
  getEmployeeDashBoardData,
  getAdminDashBoardData,
  getEmployeePerfomance,
} from "../controller/DashBoard";
import {
  deleteEmployee,
  editEmlpoyee,
  getEmployee,
  raiseSalary,
  viewEmploye,
  getEmployeeByEmployee,
  profile,
  updateProfile,
  updateBank,
} from "../controller/Employee";

const router = express.Router();

router.get("/", authenticateUser, getEmployeeDashBoardData);
router.get("/employee/profile", authenticateUser, profile);
router.post("/employee/profile/update", authenticateUser, updateProfile);
router.post("/employee/bank/update", authenticateUser, updateBank);
router.get("/admin", authenticateAdmin, getAdminDashBoardData);
router.get("/admin/performance", authenticateAdmin, getEmployeePerfomance);
router.get("/employee", authenticateAdmin, getEmployee);
router.get("/employee/details", authenticateUser, getEmployeeByEmployee);
router.post("/employee/delete", authenticateAdmin, deleteEmployee);
router.post("/employee/view", authenticateAdmin, viewEmploye);
router.post("/employee/salary", authenticateAdmin, raiseSalary);
router.post("/employee/edit", authenticateAdmin, editEmlpoyee);

export default router;
