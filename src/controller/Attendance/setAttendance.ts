import { Request, Response } from "express";
import { setAttendanceValidation } from "../../type/validations";
import errorHanlder from "../../utils/errorHandler";
import { Attendance } from "../../model/attendance";
import { Document, Types } from "mongoose";
import timeDifferenceFinder from "../../utils/timeDifferenceFinder";

interface CustomRequest extends Request {
    user?: string; // Define the user property
    admin?: boolean;
}

interface IAttendance extends Document {
    employee_id: Types.ObjectId;
    clockIn: string;
    clockOut?: string | null;
}

export default async function setAttendance(req: CustomRequest,
    res: Response<any>) {

    const { error, value } = setAttendanceValidation.validate(req.body);

    if (error) {
        errorHanlder({
            res,
            code: 400,
            title: "Set Attendance",
            message: error.details[0].message,
        });
        return;
    }

    if ((req.user && !req.admin) || (req.user && req.admin == undefined)) {
        if (value.clockIn) {

            var attendance = new Attendance({
                employee_id: req.user,
                clockIn: value.clockIn
            });

            attendance = await attendance.save();
            return res.json({
                success: true,
                title: "Attendance",
                message: "Clock in successfully"
            })
        }
        if (value.clockOut) {
            const attendance: IAttendance | null = await Attendance.findOne({ employee_id: req.user })
                .sort({ clockIn: -1 })
                .exec();
            if (attendance) {
                attendance.clockOut = value.clockOut;
                await attendance.save();
                return res.json({
                    success: true,
                    title: "Attendance",
                    message: "Clock out successfully",
                    time: timeDifferenceFinder(attendance.clockIn,value.clockOut)
                })
            }
        }


    }



}