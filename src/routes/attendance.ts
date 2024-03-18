import { authenticateUser } from "../middleware";
import { setAttendance } from "../controller/Attendance";
import express from "express";

const router = express.Router();
router.post('/set', authenticateUser, setAttendance);

export default router;


