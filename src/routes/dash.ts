import express from "express";
import { authenticateAdmin, authenticateUser } from "../middleware";
import {
  getEmployeeDashBoardData,
  getAdminDashBoardData,
} from "../controller/DashBoard";
import { deleteEmployee, getEmployee } from "../controller/Employee";

const router = express.Router();

router.get("/", authenticateUser, getEmployeeDashBoardData);
router.get("/admin", authenticateAdmin, getAdminDashBoardData);
router.get("/employee", authenticateAdmin, getEmployee);
router.post("/employee/delete", authenticateAdmin, deleteEmployee);

export default router;
