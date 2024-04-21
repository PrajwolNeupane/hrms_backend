import { authenticateUser } from "../middleware";
import {
  getAttendance,
  getEmployeesAttendance,
  setAttendance,
} from "../controller/Attendance";
import express from "express";

const router = express.Router();
router.post("/set", authenticateUser, setAttendance);
router.get("/get", authenticateUser, getAttendance);
router.post("/employees", authenticateUser, getEmployeesAttendance);

export default router;
