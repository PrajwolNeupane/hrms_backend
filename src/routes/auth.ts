import { authenticateUser, checkSuperAdmin,authenticateAdmin } from "../middleware";
import { createEmployee, auth, logOut, logIn } from "../controller/Employee";
import { createAdmin, logIn as logInAdmin } from "../controller/Admin";
import express from "express";


const router = express.Router();

router.get("/", authenticateUser, auth);
router.get("/signout", authenticateUser, logOut);
router.post("/employee/signup", [authenticateAdmin, authenticateUser], createEmployee);
router.post("/employee/signin", logIn);

router.post("/admin/signup", checkSuperAdmin, createAdmin);
router.post("/admin/signin", logInAdmin);

export default router;
