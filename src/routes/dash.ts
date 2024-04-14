import express from "express";
import { authenticateUser } from "../middleware";
import { getDashBoardData } from "../controller/DashBoard";

const router = express.Router();

router.get("/", authenticateUser, getDashBoardData);

export default router;
