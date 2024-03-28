import { authenticateUser } from "../middleware";
import { getAttendance, setAttendance } from "../controller/Attendance";
import express from "express";

const router = express.Router();
router.post("/set", authenticateUser, setAttendance);
router.get("/get", authenticateUser, getAttendance);

export default router;
