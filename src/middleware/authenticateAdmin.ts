import "dotenv/config";
import errorHanlder from "../utils/errorHandler";
import { Request, Response, NextFunction } from "express";


export default function authenticateAdmin(req: Request<any>, res: Response<any>, next: NextFunction) {
    if (req.cookies.auth_token && req.cookies.is_admin) {
        next();
    } else {
        return errorHanlder({
            res,
            code: 403,
            title: "Forbidden",
            message: "User Forbidden",
        });
    }
}