import {
  authenticateUser,
  checkSuperAdmin,
  authenticateAdmin,
} from "../middleware";
import {
  createEmployee,
  auth,
  logOut,
  logIn,
  forgetPassword,
  resetPassword,
  employeeResetPassword
} from "../controller/Employee";
import {
  changePassword,
  createAdmin,
  logIn as logInAdmin,
  resetPassword as adminResetPassword,
} from "../controller/Admin";
import express from "express";

const router = express.Router();

router.get("/", authenticateUser, auth);
router.get("/signout", authenticateUser, logOut);
router.post("/forgetpassword", forgetPassword);
router.post("/admin/resetpassword", adminResetPassword);
router.post("/employee/resetpassword", employeeResetPassword);
router.post("/resetpassword", resetPassword);
router.post(
  "/employee/signup",
  [authenticateUser, authenticateAdmin],
  createEmployee
);
router.post("/employee/signin", logIn);

router.post("/admin/signup", checkSuperAdmin, createAdmin);
router.post(
  "/admin/changepassword",
  [authenticateUser, authenticateAdmin],
  changePassword
);
router.post("/admin/signin", logInAdmin);

export default router;
